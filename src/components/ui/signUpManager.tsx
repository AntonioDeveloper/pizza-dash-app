'use client'

import { useState, useEffect } from "react";
import { useOrders } from "@/context/context";
import SignUpClientsModal from "./signUpClientsModal";

export default function SignUpManager() {
  const { isSignUpModalOpen, setIsSignUpModalOpen, signUpClient, loginClient, currentClient, logoutClient } = useOrders();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Limpa os inputs de formulário quando o modal estiver aberto
  useEffect(() => {
    if (isSignUpModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      setMode('login');
      setNome("");
      setEndereco("");
      setTelefone("");
    }
  }, [isSignUpModalOpen]);

  const handleLogout = async () => {
    await logoutClient();
    setIsSignUpModalOpen(false);
  };

  if (isSignUpModalOpen && currentClient) {
    return (
      <SignUpClientsModal open={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)}>
        <div className="flex flex-col gap-4 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Olá, {currentClient.nome_cliente}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                Você já está logado.
            </p>
            <div className="flex flex-col gap-3 mt-4">
                <button 
                    onClick={() => setIsSignUpModalOpen(false)}
                    className="w-full h-12 bg-[#ec4913] text-white font-semibold rounded-md hover:bg-[#d14010] transition-colors"
                >
                    Continuar Comprando
                </button>
                <button 
                    onClick={handleLogout}
                    className="w-full h-12 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                    Sair / Trocar Conta
                </button>
            </div>
        </div>
      </SignUpClientsModal>
    )
  }

  const handleSignUp = async () => {
    const payload = { nome_cliente: nome, endereco, telefone };
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const result = await signUpClient(payload);
      if (typeof result === 'object' && result && !result.ok) {
        setErrorMessage(result.errorMessage ?? "Erro ao cadastrar");
      } else {
        setSuccessMessage("Cliente cadastrado com sucesso!");
        setTimeout(() => {
          setIsSignUpModalOpen(false);
        }, 1500);
      }
    } catch {
      setErrorMessage("Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      const normalizedPhone = telefone.replace(/\D/g, '');
      if (!normalizedPhone) {
        setErrorMessage("Por favor, informe um telefone válido.");
        setIsLoading(false);
        return;
      }

      const result = await loginClient(normalizedPhone);
      
      if (typeof result === 'object' && result && 'ok' in result) {
        if (result.ok) {
          setSuccessMessage(`Bem-vindo(a), ${result.client.nome_cliente}!`);
          // Não fecha mais automaticamente, deixa o usuário ver a tela de logado
        } else {
          setErrorMessage(result.errorMessage ?? "Erro ao entrar");
        }
      } else {
        setErrorMessage("Erro inesperado ao realizar login.");
      }
    } catch {
      setErrorMessage("Ocorreu um erro inesperado no login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpClientsModal open={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)}>
      <div className="flex flex-col gap-4">
        {/* Abas */}
        <div className="flex border-b border-gray-200 dark:border-slate-700 mb-2">
            <button 
                className={`flex-1 pb-2 text-center font-medium transition-colors ${mode === 'login' ? 'text-[#ec4913] border-b-2 border-[#ec4913]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
            >
                Entrar
            </button>
            <button 
                className={`flex-1 pb-2 text-center font-medium transition-colors ${mode === 'signup' ? 'text-[#ec4913] border-b-2 border-[#ec4913]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => { setMode('signup'); setErrorMessage(null); setSuccessMessage(null); }}
            >
                Cadastrar
            </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
            {mode === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
        </h2>
        
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded text-sm text-center">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded text-sm text-center">
            {successMessage}
          </div>
        )}

        {mode === 'signup' && (
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
            <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border border-gray-300 dark:border-slate-600 rounded p-2 focus:outline-none focus:border-orange-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                placeholder="Nome completo"
            />
            </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
          <input 
            type="text" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="border border-gray-300 dark:border-slate-600 rounded p-2 focus:outline-none focus:border-orange-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            placeholder="(11) 99999-9999"
          />
        </div>

        {mode === 'signup' && (
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
            <input 
                type="text" 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="border border-gray-300 dark:border-slate-600 rounded p-2 focus:outline-none focus:border-orange-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                placeholder="Rua, Número, Bairro"
            />
            </div>
        )}

        <button 
          onClick={mode === 'login' ? handleLogin : handleSignUp}
          disabled={isLoading || !!successMessage}
          className={`mt-4 py-3 px-4 rounded-xl font-bold text-white transition-colors ${
            isLoading || !!successMessage ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ec4913] hover:bg-[#d14010]'
          }`}
        >
          {isLoading ? 'Processando...' : successMessage ? 'Sucesso!' : (mode === 'login' ? 'Entrar' : 'Cadastrar')}
        </button>
      </div>
    </SignUpClientsModal>
  );
}
