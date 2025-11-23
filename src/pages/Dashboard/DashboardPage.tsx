import { useState } from "react";
import type { FormEvent } from "react";

type BackendResponse = {
  uuid: string;
  resultado_final: string;

  // nomes REAIS do backend
  detect?: {
    classe: string;
    prob_normal: number;
    prob_cancer: number;
  };

  classify?: {
    subtipo: string;
    prob_benigno: number;
    prob_maligno: number;
    confianca_subtipo: number;
  };

  s3?: {
    raw?: string;
    processed?: string | null;
    results_json?: string | null;
  };

  imagem_tratada_base64?: string | null;
};

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BackendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exams/process`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok) setError(data.error || "Erro ao processar a imagem.");
      else setResult(data);
    } catch {
      setError("Falha ao conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-pinkscan-dark mb-2">
        Nova análise de mamografia
      </h1>

      <p className="text-sm text-pinkscan-dark/80 mb-6">
        Envie uma imagem de mamografia para análise automática pelo modelo de IA.
      </p>

      {/* ====================== */}
      {/* FORM DE UPLOAD        */}
      {/* ====================== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-2xl border border-pinkscan-primary/20 p-6 space-y-4"
      >
        <div className="space-y-1 text-sm">
          <label className="font-medium">Imagem da mamografia</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);

              if (f) {
                const r = new FileReader();
                r.onload = () => setPreview(r.result as string);
                r.readAsDataURL(f);
              } else {
                setPreview(null);
              }
            }}
            className="block w-full text-sm text-pinkscan-dark/80 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pinkscan-primary file:text-white hover:file:opacity-90"
          />
        </div>

        {preview && (
          <div className="mt-2">
            <p className="text-sm text-pinkscan-dark/70 mb-1">
              Pré-visualização:
            </p>
            <img src={preview} className="w-64 border rounded-lg" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="px-5 py-2.5 rounded-full bg-pinkscan-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Analisando..." : "Enviar para análise"}
        </button>

        {loading && (
          <div className="flex items-center gap-2 mt-3 text-pinkscan-dark">
            <div className="w-4 h-4 border-2 border-pinkscan-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Processando imagem...</span>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-2 bg-red-50 p-3 rounded">
            {error}
          </p>
        )}
      </form>

      {/* ====================== */}
      {/* RESULTADO FINAL        */}
      {/* ====================== */}
      {result && (
        <div className="mt-6 bg-white/90 rounded-2xl border border-pinkscan-primary/30 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-pinkscan-dark">
            Resultado da Análise
          </h2>

          <p className="text-sm text-pinkscan-dark/85 mb-2">
            Classificação final:{" "}
            <span className="font-semibold uppercase">
              {result.resultado_final}
            </span>
          </p>

          {/* DETECÇÃO */}
          {result.detect && (
            <div>
              <h3 className="font-semibold text-pinkscan-dark mb-1">
                Etapa 1 – Detecção (Normal × Câncer)
              </h3>

              <p className="text-sm">
                Classe detectada:{" "}
                <b>{result.detect.classe}</b>
              </p>

              <p className="text-sm">
                Prob. Normal: {result.detect.prob_normal.toFixed(1)}%
              </p>
              <p className="text-sm">
                Prob. Câncer: {result.detect.prob_cancer.toFixed(1)}%
              </p>
            </div>
          )}

          {/* CLASSIFICAÇÃO */}
          {result.classify && (
            <div>
              <h3 className="font-semibold text-pinkscan-dark mb-1">
                Etapa 2 – Classificação (Benigno × Maligno)
              </h3>

              <p className="text-sm">
                Subtipo: <b>{result.classify.subtipo}</b>
              </p>

              <p className="text-sm">
                Prob. Benigno: {result.classify.prob_benigno.toFixed(1)}%
              </p>
              <p className="text-sm">
                Prob. Maligno: {result.classify.prob_maligno.toFixed(1)}%
              </p>
              <p className="text-sm">
                Confiança: {result.classify.confianca_subtipo.toFixed(1)}%
              </p>
            </div>
          )}

          {/* ====================== */}
          {/* COMPARAÇÃO VISUAL      */}
          {/* ====================== */}
          {(preview || result.imagem_tratada_base64) && (
            <div>
              <h3 className="text-base font-semibold text-pinkscan-dark mb-3">
                Comparação visual
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-sm mb-2">Imagem enviada:</p>
                  <img
                    src={preview || ""}
                    className="rounded-lg border shadow-sm max-h-80 object-contain"
                  />
                </div>

                <div>
                  <p className="font-medium text-sm mb-2">
                    Imagem processada pelo modelo:
                  </p>
                  <img
                    src={`data:image/png;base64,${result.imagem_tratada_base64}`}
                    className="rounded-lg border shadow-sm max-h-80 object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CARD FINAL */}
          {result.imagem_tratada_base64 && (
            <div className="bg-gray-50 border rounded-xl p-4 shadow-sm mt-6">
              <h4 className="font-semibold text-sm mb-3">
                Visualização detalhada:
              </h4>

              <img
                src={`data:image/png;base64,${result.imagem_tratada_base64}`}
                className="rounded-lg mx-auto max-h-[400px] object-contain shadow-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
