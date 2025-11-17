import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../../design-system/design-tokens.css";

type Option = { id: string; label: string; image?: string; material?: string };

type Combination = { pendant?: string; finish?: string };

type ConfiguratorProps = {
  initial?: Combination;
  pendants?: Option[];
  finishes?: Option[];
  onSave?: (combination: Combination) => void;
};

export default function Configurator({
  initial,
  pendants = [],
  finishes = [],
  onSave,
}: ConfiguratorProps) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [selectedPendant, setSelectedPendant] = useState(
    initial?.pendant || pendants[0]?.id || ""
  );
  const [selectedFinish, setSelectedFinish] = useState(
    initial?.finish || finishes[0]?.id || ""
  );

  useEffect(() => {
    // reflect data-pressed into aria-pressed for accessibility while keeping JSX free of aria expressions
    if (!containerRef.current) return;
    const btns = containerRef.current.querySelectorAll("button[data-pressed]");
    btns.forEach((b) => {
      const val = b.getAttribute("data-pressed") || "false";
      b.setAttribute("aria-pressed", val);
    });
  }, [selectedPendant]);

  return (
    <section className="configurator">
      <div className="preview" aria-live="polite" aria-atomic="true">
        <Image
          src={
            pendants.find((p) => p.id === selectedPendant)?.image ||
            "/imagens/placeholder-configurator.png"
          }
          alt="Preview da montagem"
          width={360}
          height={260}
          className="preview-img"
        />
        <div className="preview-legend">Preview em tempo real</div>
      </div>

      <aside className="options" aria-label="Opções de montagem">
        <div className="stepper">
          <h4>1. Escolha o pingente</h4>
          <ul ref={containerRef}>
            {pendants.map((p) => (
              <li key={p.id}>
                <button
                  data-pressed={selectedPendant === p.id ? "true" : "false"}
                  onClick={() => setSelectedPendant(p.id)}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="stepper">
          <h4>2. Escolha o fecho</h4>
          <ul>
            {finishes.map((f) => (
              <li key={f.id}>
                <button
                  data-pressed={selectedFinish === f.id ? "true" : "false"}
                  onClick={() => setSelectedFinish(f.id)}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="actions">
          <button
            className="btn btn-outline"
            onClick={() =>
              onSave?.({ pendant: selectedPendant, finish: selectedFinish })
            }
          >
            Salvar combinação
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              onSave?.({ pendant: selectedPendant, finish: selectedFinish })
            }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </aside>
    </section>
  );
}
