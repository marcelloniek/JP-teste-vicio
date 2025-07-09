"use client";

import { useState } from 'react';

const perguntas = [
  "自分に害があると分かっていても、やめられない行動や習慣がある。",
  "特定の行動をやめたり減らそうとすると、不安やイライラ、強い感情的苦痛を感じる。",
  "繰り返す行動や依存が原因で、家族や社会生活、仕事に問題を起こしたことがある。",
  "健康的でないと分かっていても、一日の大部分を特定の行動について考えたり計画したりしている。",
  "ある行動を何度もやめようとしたが、結局いつも同じ習慣に戻ってしまう。",
  "最近、自分の強迫的な行動や依存が原因で、自殺や自傷行為を真剣に考えたことがある。", // FLAG
  "強迫的な行動や依存のために、強い罪悪感や恥を感じる。",
  "繰り返す行動や依存のせいで、身体的または経済的な損失を被ったことがある。",
  "自分の習慣や依存を批判されたり判断されたりすることを恐れ、近しい人に嘘をついたり隠したりする。",
  "助けが必要だと分かっていても、他人に自分の問題を認めたり、助けを求めることが非常に難しい。"
];

export default function TesteVicio() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">依存症テスト</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              以下の状況が現在のあなたにどの程度当てはまるかを選んでください：<br />
              <strong>(1) まったくない | (2) たまにある | (3) 時々ある | (4) よくある | (5) ほとんど常にある</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${gradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">結果: {resultado}</h2>
          <img
            src={
              resultado === "緑"
                ? "/images/semaforo-verde.png"
                : resultado === "黄"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`信号表示: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "緑" && (
            <p className="text-center">あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>
          )}
          {resultado === "黄" && (
            <p className="text-center">取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>
          )}
          {resultado === "赤" && (
            <p className="text-center">この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
    
        </>
      )}
    </div>
  );
}
