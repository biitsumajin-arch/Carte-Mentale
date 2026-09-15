import React, { useState, useEffect } from 'react';
import { createClient, User, Session } from '@supabase/supabase-js';
import {
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Compass,
  LogOut,
  ShieldCheck,
  User as UserIcon,
  Sparkles,
  Layers,
  KeyRound,
  FileCheck2,
  Check
} from 'lucide-react';

// ============================================================================
// 1. Initialisation Supabase Client & Détection URL/Clé
// ============================================================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://votre-projet.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'votre-cle-anon-publique';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// 2. Types
// ============================================================================
export interface UserProfile {
  id: string;
  email: string;
  role: string;
  created_at?: string;
}

export interface UserPersonalNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  updated_at: string;
}

interface SupabaseAuthSystemProps {
  /** Mode d'affichage: 'page' plein écran ou 'compact' intégré */
  displayMode?: 'page' | 'compact' | 'modal';
  /** Callback optionnel lorsqu'une action est effectuée */
  onClose?: () => void;
  /** Titre personnalisé pour la page / carte */
  customTitle?: string;
}

// ============================================================================
// 3. Bouton Universel d'Accès Authentification (Pour intégrer sur chaque page)
// ============================================================================
export const AuthNavigationButton: React.FC<{
  onOpenAuth: () => void;
  className?: string;
}> = ({ onOpenAuth, className = '' }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      if (data?.role) setUserRole(data.role);
    } catch {
      // Ignorer si table non synchronisée
    }
  };

  if (currentUser) {
    return (
      <button
        onClick={onOpenAuth}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer ${className}`}
        title={`Connecté en tant que ${currentUser.email}`}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <UserIcon className="w-3.5 h-3.5" />
        <span className="truncate max-w-[120px]">{currentUser.email?.split('@')[0]}</span>
        {userRole && (
          <span className="px-1.5 py-0.2 bg-emerald-200 dark:bg-emerald-800 rounded text-[10px] uppercase font-bold">
            {userRole}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onOpenAuth}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer ${className}`}
    >
      <UserPlus className="w-3.5 h-3.5" />
      <span>Inscription / Connexion</span>
    </button>
  );
};

// ============================================================================
// 4. Composant Complet de Gestion de Compte & Espace Utilisateur Isolé
// ============================================================================
export const SupabaseAuthView: React.FC<SupabaseAuthSystemProps> = ({
  displayMode = 'page',
  onClose,
  customTitle
}) => {
  // États d'authentification
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // États du formulaire
  const [isSignUp, setIsSignUp] = useState<boolean>(true); // Vue Inscription par défaut
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Données utilisateur isolées (chaque personne ne voit que ses notes / ses modifications)
  const [personalNotes, setPersonalNotes] = useState<UserPersonalNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // 1. Initialiser et écouter l'état Supabase Auth
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserData(session.user.id);
      }
      setLoadingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        await loadUserData(currentSession.user.id);
      } else {
        setRole(null);
        setPersonalNotes([]);
      }
      setLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Charger les données propres à l'utilisateur connecté
  const loadUserData = async (userId: string) => {
    try {
      // Récupérer le profil et rôle
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (profileData?.role) {
        setRole(profileData.role);
      } else {
        setRole('user');
      }

      // Récupérer les notes privées (sécurisées par RLS supabase ou filtrées sur userId)
      const { data: notesData, error: notesErr } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (!notesErr && notesData) {
        setPersonalNotes(notesData);
      } else {
        // Fallback local storage sécurisé par identifiant utilisateur si la table user_notes n'est pas encore créée
        const localSaved = localStorage.getItem(`user_private_notes_${userId}`);
        if (localSaved) {
          setPersonalNotes(JSON.parse(localSaved));
        }
      }
    } catch (e) {
      console.error('Erreur chargement données utilisateur:', e);
    }
  };

  // 3. Traduction des erreurs d'authentification
  const translateAuthError = (err: string): string => {
    if (err.includes('User already registered') || err.includes('already exists')) {
      return 'Cette adresse e-mail est déjà inscrite. Veuillez vous connecter.';
    }
    if (err.includes('Invalid login credentials')) {
      return 'Identifiants incorrects (e-mail ou mot de passe invalide).';
    }
    if (err.includes('Password should be at least')) {
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    if (err.includes('Email not confirmed')) {
      return 'Veuillez confirmer votre adresse e-mail via le lien reçu.';
    }
    return err || 'Une erreur est survenue lors de la communication avec Supabase.';
  };

  // 4. Inscription / Connexion
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Tous les champs sont requis.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit comporter 6 caractères minimum.');
      return;
    }

    setSubmitting(true);

    try {
      if (isSignUp) {
        // INSCRIPTION
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          setErrorMessage(translateAuthError(error.message));
          return;
        }

        if (data.user && !data.session) {
          setSuccessMessage('🎉 Compte créé ! Vérifiez votre boîte e-mail pour confirmer l\'inscription.');
        } else if (data.user) {
          setSuccessMessage('🎉 Inscription réussie ! Bienvenue sur la plateforme.');
          setUser(data.user);
          await loadUserData(data.user.id);
        }
      } else {
        // CONNEXION
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (error) {
          setErrorMessage(translateAuthError(error.message));
          return;
        }

        if (data.user) {
          setSuccessMessage('Connexion réussie.');
          setUser(data.user);
          await loadUserData(data.user.id);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erreur réseau inattendue.');
    } finally {
      setSubmitting(false);
    }
  };

  // 5. Déconnexion
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    setPersonalNotes([]);
    setSuccessMessage('Vous êtes maintenant déconnecté(e).');
  };

  // 6. Ajouter une modification / note personnelle strictement réservée à cet utilisateur
  const handleSavePersonalNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newNoteTitle.trim()) return;

    setSavingNote(true);
    const newNote: UserPersonalNote = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      updated_at: new Date().toISOString()
    };

    try {
      // Tentative écriture base Supabase
      const { error } = await supabase.from('user_notes').insert([newNote]);
      
      const updatedNotes = [newNote, ...personalNotes];
      setPersonalNotes(updatedNotes);
      // Synchronisation de secours local
      localStorage.setItem(`user_private_notes_${user.id}`, JSON.stringify(updatedNotes));

      setNewNoteTitle('');
      setNewNoteContent('');
    } catch {
      // Secours local
      const updatedNotes = [newNote, ...personalNotes];
      setPersonalNotes(updatedNotes);
      localStorage.setItem(`user_private_notes_${user.id}`, JSON.stringify(updatedNotes));
    } finally {
      setSavingNote(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <span className="text-sm font-medium">Vérification de votre session Supabase...</span>
      </div>
    );
  }

  // ==========================================================================
  // Vue Utilisateur Connecté (Espace Isolé & Privé)
  // ==========================================================================
  if (user) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* En-tête profil */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Espace Personnel & Sécurisé
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Rôle : {role || 'user'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Connecté avec <strong className="text-slate-700 dark:text-slate-200">{user.email}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition cursor-pointer"
                >
                  Fermer
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium transition shadow-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">ID Unique (UUID) : </span>
              <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{user.id}</code>
            </div>
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Isolation : </span>
              <span>Seules vos données associées à cet ID sont visibles.</span>
            </div>
          </div>
        </div>

        {/* Section Notes et Modifications Personnelles (Isolation par utilisateur) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-indigo-500" />
              <span>Vos modifications & notes personnelles privées</span>
            </h3>
            <span className="text-xs text-slate-400">Visibles uniquement par vous</span>
          </div>

          {/* Formulaire d'ajout de note */}
          <form onSubmit={handleSavePersonalNote} className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <input
              type="text"
              required
              placeholder="Titre de votre note ou mémo personnel..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <textarea
              placeholder="Détails, avancement ou modifications que vous souhaitez retenir..."
              rows={2}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingNote || !newNoteTitle.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                {savingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Enregistrer dans mon espace</span>
              </button>
            </div>
          </form>

          {/* Liste des notes personnelles de l'utilisateur */}
          <div className="space-y-2 mt-4">
            {personalNotes.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4 italic">
                Aucune note personnelle enregistrée. Vos futures modifications apparaîtront ici.
              </p>
            ) : (
              personalNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{note.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      {new Date(note.updated_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {note.content && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line">{note.content}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // Vue Formulaire Inscription / Connexion
  // ==========================================================================
  return (
    <div className={`w-full ${displayMode === 'page' ? 'max-w-md mx-auto py-8 px-4' : 'max-w-md mx-auto'}`}>
      <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        
        {/* En-tête de carte */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/50">
                {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {customTitle || (isSignUp ? 'Inscription au site' : 'Connexion utilisateur')}
                </h2>
                <p className="text-xs text-slate-400">Accédez à votre espace individuel</p>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                Fermer
              </button>
            )}
          </div>

          {/* Onglets Bascule Inscription / Connexion */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Créer un compte
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Se connecter
            </button>
          </div>
        </div>

        {/* Corps du Formulaire */}
        <div className="p-6 space-y-4">
          
          {/* Notification Erreur */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Notification Succès */}
          {successMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {/* E-mail */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Mot de passe
                </label>
                {isSignUp && (
                  <span className="text-[11px] text-slate-400">Min. 6 caractères</span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bouton Principal */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? "Créer mon compte Supabase" : "Se connecter"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
              ou
            </span>
          </div>

          {/* Bouton Continuer en tant que Visiteur */}
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
            }}
            className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Continuer en tant que Visiteur (Sans compte)</span>
          </button>
        </div>

        {/* Pied de carte d'information */}
        <div className="py-3 px-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            🔒 Sécurité & Isolation des données par <strong className="text-slate-600 dark:text-slate-300 font-semibold">Supabase PostgreSQL RLS</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupabaseAuthView;
