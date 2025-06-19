import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Image, Type } from 'lucide-react';

const colorPresets = [
  { primary: 'rgba(255, 199, 14, 1)', secondary: 'rgba(113, 0, 109, 1)' },
  { primary: '#FF6B6B', secondary: '#4ECDC4' },
  { primary: '#6C5CE7', secondary: '#A8E6CF' },
  { primary: '#FF8C00', secondary: '#483D8B' },
];

export default function Personalization() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Personalização</h1>
        <p className="text-muted-foreground">
          Personalize a aparência do sistema
        </p>
      </div>

      <Tabs defaultValue="colors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Cores
          </TabsTrigger>
          <TabsTrigger value="logo" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Tipografia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cores do Sistema</CardTitle>
              <CardDescription>
                Escolha as cores principais do sistema ou defina cores personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Presets de Cores */}
              <div>
                <Label>Presets de Cores</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      className="p-4 rounded-lg border hover:border-primary transition-colors"
                    >
                      <div className="flex gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <div className="text-sm text-left">Preset {index + 1}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores Personalizadas */}
              <div className="space-y-4">
                <Label>Cores Personalizadas</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input type="color" value="#FFC70E" className="w-20" />
                      <Input value="rgba(255, 199, 14, 1)" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Secundária</Label>
                    <div className="flex gap-2">
                      <Input type="color" value="#71006D" className="w-20" />
                      <Input value="rgba(113, 0, 109, 1)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-x-2 flex justify-end">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Visualize como as cores serão aplicadas nos elementos do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button>Botão Primário</Button>
                  <Button variant="outline">Botão Secundário</Button>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  Background com cor primária
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  Background com cor secundária
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo do Sistema</CardTitle>
              <CardDescription>
                Faça upload da logo da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
                <Button>Fazer Upload da Logo</Button>
                <p className="text-sm text-muted-foreground mt-2">
                  PNG, JPG ou SVG (max. 2MB)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipografia</CardTitle>
              <CardDescription>
                Configure as fontes utilizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fonte Principal</Label>
                  <select className="w-full p-2 rounded-lg border">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Fonte Secundária</Label>
                  <select className="w-full p-2 rounded-lg border">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 space-x-2 flex justify-end">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
