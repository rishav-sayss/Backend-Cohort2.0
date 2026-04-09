import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Scale } from 'lucide-react';

export function MessageBlock({ message }) {

  const [sol1, setSol1] = React.useState("");
  const [sol2, setSol2] = React.useState("");

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl mx-auto mb-24 transition-colors duration-300">
      {/* User Query */}
      <div className="flex w-full">
        <div className="bg-white dark:bg-[#121214] px-8 py-6 rounded-3xl shadow-[0_4px_40px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_40px_-5px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-800 max-w-4xl max-w-2xl ml-auto transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3 text-gray-500 dark:text-gray-400">
            <User className="w-5 h-5" />
            <span className="font-medium text-sm tracking-wide uppercase">User Query</span>
          </div>
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed">{message.problem}</p>
        </div>
      </div>

      {/* Split Solutions */}
      <div className="grid grid-cols-2 gap-8">
        {/* Solution 1 */}
        <div className="bg-white dark:bg-[#121214] rounded-3xl p-8 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 dark:border-gray-800/80">
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Model A</h3>
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <ReactMarkdown>{message.solution_1}</ReactMarkdown>
          </div>
        </div>

        {/* Solution 2 */}
        <div className="bg-white dark:bg-[#121214] rounded-3xl p-8 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 dark:border-gray-800/80">
            <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-xl">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Model B</h3>
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <ReactMarkdown>{message.solution_2}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Judge Recommendation */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-[#17171a] dark:to-[#121214] rounded-3xl p-8 border border-gray-200/60 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 p-2 rounded-xl shadow-md">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100 tracking-tight">Judge Recommendation</h3>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{message.judge.solution_1_score}</span>
              <span className="text-gray-400 dark:text-gray-500 font-medium">/ 10</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{message.judge.solution_1_reasoning}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{message.judge.solution_2_score}</span>
              <span className="text-gray-400 dark:text-gray-500 font-medium">/ 10</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{message.judge.solution_2_reasoning}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200/60 dark:border-gray-800 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
            {message.judge.solution_1_score > message.judge.solution_2_score ?
              '🏆 Model A wins this round' :
              message.judge.solution_2_score > message.judge.solution_1_score ?
                '🏆 Model B wins this round' :
                '🤝 It\'s a tie'}
          </span>
        </div>
      </div>
    </div>
  );
}
