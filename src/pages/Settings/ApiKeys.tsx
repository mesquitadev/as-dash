import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Key, Copy, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const mockApiKeys = [
  {
    id: 1,
    name: 'PDV Principal',
    key: 'sk_live_51NXhT8JkMu7V...',
    lastUsed: '2025-06-19T10:30:00',
    active: true,
  },
  {
    id: 2,
    name: 'API de Integração',
    key: 'sk_test_51NXhT8JkMu7V...',
    lastUsed: '2025-06-18T15:45:00',
    active: true,
  },
];

export default function ApiKeys() {
  const [showKey, setShowKey] = React.useState<{[key: number]: boolean}>({});

  const toggleKeyVisibility = (id: number) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Você pode adicionar um toast aqui para feedback
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Chaves de API</h1>
        <p className="text-muted-foreground">
          Gerencie suas chaves de API para integração com outros sistemas
        </p>
      </div>

      <div className="space-y-6">
        {/* Criar Nova Chave */}
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Chave de API</CardTitle>
            <CardDescription>
              Crie uma nova chave para integrar com outros sistemas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Chave</Label>
                  <Input placeholder="Ex: PDV Principal" />
                </div>
                <div className="space-y-2">
                  <Label>Permissões</Label>
                  <select className="w-full p-2 rounded-lg border">
                    <option>Acesso Total</option>
                    <option>Apenas Leitura</option>
                    <option>Personalizado</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Key className="w-4 h-4 mr-2" />
                  Gerar Nova Chave
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Chaves */}
        <Card>
          <CardHeader>
            <CardTitle>Chaves de API Existentes</CardTitle>
            <CardDescription>
              Visualize e gerencie suas chaves de API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockApiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{apiKey.name}</span>
                      <Badge variant={apiKey.active ? "default" : "secondary"}>
                        {apiKey.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-muted-foreground font-mono">
                        {showKey[apiKey.id] ? apiKey.key : '•'.repeat(30)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showKey[apiKey.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Último uso: {new Date(apiKey.lastUsed).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch checked={apiKey.active} />
                      <span className="text-sm">
                        {apiKey.active ? "Ativa" : "Inativa"}
                      </span>
                    </div>
                    <Button variant="destructive" size="sm">
                      Revogar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
