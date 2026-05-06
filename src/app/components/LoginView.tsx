import { useState } from 'react';
import { Loader2, Lock, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function LoginView() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const executeAuthAction = async (action: 'signIn' | 'signUp') => {
    if (!supabase) {
      setFeedback("Supabase n'est pas configuré.");
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      if (action === 'signIn') {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          setFeedback(result.error.message);
        }
      } else {
        // sign up
        const result = await supabase.auth.signUp({ email, password });
        if (result.error) {
          setFeedback(result.error.message);
        } else {
          setFeedback('Compte créé. Vérifie ta boîte mail pour te connecter.');
          setMode('signIn');
          setPassword('');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex size-full items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-lg text-card-foreground">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-600/10 text-purple-600">
              <Lock className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{mode === 'signIn' ? 'Connexion' : 'Créer un compte'}</h1>
              <p className="text-sm text-muted-foreground">
                {mode === 'signIn' ? 'Accède à ton espace avec Supabase.' : 'Crée un compte pour commencer.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
            className="text-sm text-muted-foreground hover:underline"
            type="button"
          >
            {mode === 'signIn' ? 'Créer un compte' : 'Se connecter'}
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void executeAuthAction(mode);
          }}
        >
          {mode === 'signUp' && (
            <label className="block space-y-2">
              <span className="text-sm font-medium">Nom (optionnel)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none placeholder:text-muted-foreground"
                placeholder="Ton nom"
                autoComplete="name"
              />
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
              <Mail className="size-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="ton@email.com"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none placeholder:text-muted-foreground"
              placeholder="••••••••"
              autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
              {mode === 'signIn' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </div>
        </form>

        <p className="mt-4 min-h-5 text-center text-sm text-muted-foreground">
          {feedback ?? (mode === 'signIn' ? 'Utilise ton compte Supabase pour accéder à l’application.' : 'Nous t’enverrons un email si une confirmation est requise.')}
        </p>
      </div>
    </div>
  );
}

