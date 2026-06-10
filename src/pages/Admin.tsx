import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Briefcase, FileText, Settings, Users, LogOut, Plus, Trash2, Edit, ExternalLink, CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  auth, 
  loginWithGoogle, 
  logout, 
  db, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  storage, 
  addDoc, 
  serverTimestamp 
} from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { toast } from 'sonner';
import type { Lead, Project, BlogPost } from '@/types';

export default function AdminPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [uploading, setUploading] = React.useState(false);

  // Form states
  const [showForm, setShowForm] = React.useState(false);
  const [formType, setFormType] = React.useState<'project' | 'blog'>('project');
  const [formData, setFormData] = React.useState({ 
    title: '', 
    category: '', 
    liveDemo: '', 
    github: '', 
    tech: '',
    description: '',
    content: ''
  });
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const [isStaff, setIsStaff] = React.useState(false);

  React.useEffect(() => {
    const isStaffAuth = localStorage.getItem('admin_access') === 'true';
    setIsStaff(isStaffAuth);

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (!user && !isStaff) return;

    const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
    });

    const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    });

    return () => {
      unsubLeads();
      unsubProjects();
    };
  }, [user]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleUploadAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) {
      toast.error('Pilih foto terlebih dahulu');
      return;
    }

    try {
      setUploading(true);
      
      // 1. Upload to Storage
      const fileRef = ref(storage, `${formType}s/${Date.now()}_${selectedFile.name}`);
      const uploadResult = await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // 2. Save to Firestore
      if (formType === 'project') {
        const projectData: Project = {
          title: formData.title,
          slug: generateSlug(formData.title),
          description: formData.description,
          category: formData.category,
          thumbnail: downloadURL,
          techStack: formData.tech.split(',').map(t => t.trim()),
          liveDemo: formData.liveDemo,
          github: formData.github,
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'projects'), projectData);
        toast.success('Project berhasil ditambahkan!');
      } else {
        const blogData: BlogPost = {
          title: formData.title,
          slug: generateSlug(formData.title),
          content: formData.content,
          thumbnail: downloadURL,
          category: formData.category,
          published: true,
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'posts'), blogData);
        toast.success('Artikel berhasil ditambahkan!');
      }

      setShowForm(false);
      setSelectedFile(null);
      setFormData({ title: '', category: '', liveDemo: '', github: '', tech: '', description: '', content: '' });
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error('Gagal mengupload data');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_access');
    logout();
    setIsStaff(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <div className="w-8 h-8 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && !isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F] p-4">
        <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-400 text-sm">Please sign in with your authorized Google account.</p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={loginWithGoogle}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1F] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-white/10 flex-col p-6 space-y-8 h-screen sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF] flex items-center justify-center">
            <Settings className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-white uppercase tracking-wider">CMS Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Portfolio', icon: Briefcase },
            { name: 'Leads', icon: Users },
            { name: 'Blog', icon: FileText },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 mb-6">
            {user ? (
              <>
                <img src={user.photoURL || ''} className="w-8 h-8 rounded-full" alt="" />
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium text-white truncate">{user.displayName}</div>
                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF]">
                  <CircleUser className="w-5 h-5" />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium text-white truncate">Staff Account</div>
                  <div className="text-xs text-gray-500 truncate">Agency Owner</div>
                </div>
              </>
            )}
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/5 px-4"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
              <p className="text-gray-400 text-sm mt-1">Monitor your agency performance and manage content.</p>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto bg-[#00D4FF] text-black hover:bg-[#00B4FF]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Content
              </Button>
            )}
          </header>

          {showForm && (
            <Card className="bg-white/5 border-[#00D4FF]/30 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Tambah {formType === 'project' ? 'Project Portfolio' : 'Artikel Blog'}</CardTitle>
                  <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    <button 
                      onClick={() => setFormType('project')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${formType === 'project' ? 'bg-[#00D4FF] text-black' : 'text-gray-400'}`}
                    >
                      Project
                    </button>
                    <button 
                      onClick={() => setFormType('blog')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${formType === 'blog' ? 'bg-[#00D4FF] text-black' : 'text-gray-400'}`}
                    >
                      Blog
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadAndSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Judul</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Kategori</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. E-Commerce, Landing Page"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-bold block">Deskripsi / Ringkasan</label>
                    <textarea 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none h-20"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {formType === 'blog' && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400 font-bold block">Konten Artikel</label>
                      <textarea 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none h-40"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-bold block">Ambil Foto dari Galeri HP</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#00D4FF]/10 file:text-[#00D4FF]
                        hover:file:bg-[#00D4FF]/20 cursor-pointer"
                    />
                    {selectedFile && (
                      <p className="text-xs text-green-400">File terpilih: {selectedFile.name}</p>
                    )}
                  </div>

                  {formType === 'project' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Link Live Demo</label>
                        <input 
                          type="url" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none"
                          value={formData.liveDemo}
                          onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Tech Stack (pisahkan dengan koma)</label>
                        <input 
                          type="text" 
                          placeholder="React, Tailwind, Firebase"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-[#00D4FF] outline-none"
                          value={formData.tech}
                          onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={uploading}
                      className="bg-[#00D4FF] text-black hover:bg-[#00B4FF] flex-1 font-bold"
                    >
                      {uploading ? 'Mengupload...' : 'Simpan Content'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setShowForm(false)}
                      className="border border-white/10 text-white"
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard title="Total Leads" value={leads.length.toString()} trend="+12%" />
            <StatCard title="Active Projects" value={projects.length.toString()} trend="+2" />
            <StatCard title="Revenue" value="Rp 45M" trend="+Rp 5M" />
            <StatCard title="Visitors" value="1.2k" trend="+15%" />
          </div>

          <Tabs defaultValue="leads" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="leads" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Recent Leads</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leads" className="mt-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="text-sm hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-xs text-gray-500">{lead.whatsapp}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                lead.status === 'New' ? 'bg-blue-400/10 text-blue-400' :
                                lead.status === 'Won' ? 'bg-green-400/10 text-green-400' :
                                'bg-gray-400/10 text-gray-400'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {lead.createdAt?.toDate().toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:bg-red-400/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white/5 border-white/10 text-white overflow-hidden group">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={project.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <Button size="icon" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive" className="bg-red-500/80 hover:bg-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="text-xs text-gray-500 mt-1">{project.category}</p>
                        </div>
                        <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardContent className="pt-6">
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="text-[10px] font-medium text-green-400">{trend} from last month</div>
      </CardContent>
    </Card>
  );
}
