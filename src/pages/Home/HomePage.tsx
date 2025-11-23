import heroImg from "../../assets/hero-pinkscan.png";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO minimalista */}
      <section className="min-h-[70vh] flex flex-col md:flex-row items-center gap-12">
        {/* Texto */}
        <div className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-wide text-pinkscan-primary font-semibold">
            Diagnóstico assistido por IA
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-pinkscan-dark leading-tight">
            Nunca perca a oportunidade de priorizar casos críticos de câncer de
            mama.
          </h1>

          <p className="text-base md:text-lg text-pinkscan-dark/80 max-w-xl">
            O Pink Scan analisa mamografias em segundos, ajudando equipes
            médicas a identificar rapidamente exames suspeitos, reduzir atrasos
            e apoiar decisões clínicas com mais segurança.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/register">
              <Button>Quero testar no meu hospital</Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline">Ver como funciona</Button>
            </a>
          </div>

          <p className="text-xs text-pinkscan-dark/60">
            Sem compromisso inicial. Integração via API ou upload manual de
            exames para prova de conceito.
          </p>
        </div>

        {/* Imagem / lado direito */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            {/* “círculo” de fundo para dar cara de produto SaaS */}
            <div className="absolute inset-0 rounded-3xl bg-pinkscan-primary/10 blur-2xl" />
            <Card className="relative p-4 md:p-6">
              <div className="rounded-2xl overflow-hidden bg-pinkscan-light">
                {/* se a imagem ainda não existir, só não aparece nada */}
                <img
                  src={heroImg}
                  alt="Médica analisando exames com IA Pink Scan"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p className="font-semibold text-pinkscan-dark">
                  Fluxo de trabalho exemplo
                </p>
                <p className="text-pinkscan-dark/75 text-xs">
                  Upload da mamografia → análise pelo modelo de IA → retorno de
                  probabilidade de lesão maligna → fila priorizada para o
                  radiologista.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-pinkscan-dark">
          Como o Pink Scan se encaixa no seu fluxo
        </h2>

        <div className="grid md:grid-cols-3 gap-4 text-sm text-pinkscan-dark/85">
          <Card className="p-4">
            <h3 className="font-semibold mb-1">1. Entrada das imagens</h3>
            <p>
              Integração com PACS/RIS existente ou upload seguro de
              mamografias em lote para prova de conceito.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">2. Análise pelo modelo de IA</h3>
            <p>
              O modelo classifica o risco da lesão e gera probabilidades
              agregadas para cada exame.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">3. Priorização inteligente</h3>
            <p>
              Exames suspeitos são destacados para revisão rápida, ajudando a
              reduzir atrasos no diagnóstico.
            </p>
          </Card>
        </div>
      </section>

      {/* Segurança / Hospital */}
      <section id="para-hospitais" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-pinkscan-dark">
          Pensado para hospitais e clínicas
        </h2>

        <div className="grid md:grid-cols-3 gap-4 text-sm text-pinkscan-dark/85">
          <Card className="p-4">
            <h3 className="font-semibold mb-1">Implantação rápida</h3>
            <p>
              Modelo em nuvem, API REST, sem necessidade de hardware dedicado
              para começar a testar.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">Governança e auditoria</h3>
            <p>
              Log de cada exame analisado, com histórico de métricas e
              rastreabilidade para o time clínico.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-1">Segurança e LGPD</h3>
            <p>
              Em produção, o ambiente é projetado para criptografia em trânsito,
              segregação de ambientes e adequação à LGPD.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white/70 border border-pinkscan-primary/20 rounded-2xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-pinkscan-dark">
            Quer simular o Pink Scan com exames reais?
          </h2>
          <p className="text-sm text-pinkscan-dark/80 mt-1">
            Agende uma conversa rápida e entenda como integrar a IA ao seu
            fluxo atual de mamografia.
          </p>
        </div>
        <Link to="/register">
          <Button>Falar com o time comercial</Button>
        </Link>
      </section>
    </div>
  );
}
