"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function ApiKeyGenerator() {
  const [label, setLabel] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");

  async function generateKey() {
    if (!label.trim()) {
      toast.error("Please enter a label for your API key");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/keys/generate-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: label.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate API key");
      }

      const data = await response.json();
      setGeneratedKey(data.apiKey);
      setLabel("");
      toast.success("API key generated successfully!");
      
      // Refresh the page to show the new key in the list
      window.location.reload();
    } catch (error) {
      console.error("Error generating API key:", error);
      toast.error("Failed to generate API key");
    } finally {
      setIsGenerating(false);
    }
  }

  if (generatedKey) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>API Key Generated</CardTitle>
          <CardDescription>
            Copy this key now. It won't be shown again for security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
            {generatedKey}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigator.clipboard.writeText(generatedKey)}
              variant="outline"
              size="sm"
            >
              Copy Key
            </Button>
            <Button
              onClick={() => setGeneratedKey("")}
              variant="outline"
              size="sm"
            >
              Generate Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="keyLabel">API Key Label</Label>
        <Input
          id="keyLabel"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g., My App API Key"
        />
      </div>
      <Button 
        onClick={generateKey} 
        disabled={isGenerating || !label.trim()}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate API Key"}
      </Button>
    </div>
  );
}