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
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">結果: {resultado}</h2>
          {resultado === "緑" && <p>あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>}
          {resultado === "黄" && <p>取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>}
          {resultado === "赤" && <p>この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
        </>
      )}
    </div>
  );
}
