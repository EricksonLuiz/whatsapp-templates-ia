
import React, { useState } from 'react';
import { MessageSquare, Send, Bot } from 'lucide-react';
import Card from './Card';

interface AIChatProps {
  prompt: string;
  onTemplateGenerated: (template: any) => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat: React.FC<AIChatProps> = ({ prompt, onTemplateGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou sua IA especializada em criar templates. Como posso ajudá-lo hoje?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateTemplate = async (userMessage: string) => {
    // Simulação de resposta da IA
    const templates = [
      {
        name: 'Promoção Flash',
        type: 'promocional',
        app: 'whatsapp',
        title: '🔥 OFERTA RELÂMPAGO!',
        body: 'Olá {{nome}}! Temos uma oferta especial só para você: {{desconto}}% de desconto em todos os produtos até {{data_fim}}!',
        footer: 'Não perca esta oportunidade!',
        variables: ['nome', 'desconto', 'data_fim'],
        buttons: ['Ver Ofertas', 'Falar com Vendedor']
      },
      {
        name: 'Boas-vindas VIP',
        type: 'boas-vindas',
        app: 'whatsapp',
        title: '🎉 Bem-vindo à nossa família!',
        body: 'Olá {{nome}}! É um prazer tê-lo conosco. Aqui você encontrará os melhores produtos e atendimento personalizado.',
        footer: 'Equipe {{empresa}}',
        variables: ['nome', 'empresa'],
        buttons: ['Conhecer Produtos', 'Suporte']
      }
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      message: `Criei um template perfeito para você! Aqui está:

**${randomTemplate.name}**
- Tipo: ${randomTemplate.type}
- Título: ${randomTemplate.title}
- Corpo: ${randomTemplate.body}
- Rodapé: ${randomTemplate.footer}
- Variáveis: ${randomTemplate.variables.join(', ')}
- Botões: ${randomTemplate.buttons.join(', ')}

Quer que eu faça algum ajuste ou você gostaria de usar este template?`,
      template: randomTemplate
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simular delay da IA
    setTimeout(async () => {
      try {
        const response = await generateTemplate(inputText);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Oferecer para usar o template
        setTimeout(() => {
          const useTemplateMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: 'Clique no botão abaixo para usar este template automaticamente no formulário:',
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, useTemplateMessage]);
        }, 1000);
        
      } catch (error) {
        console.error('Erro ao gerar template:', error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleUseTemplate = () => {
    // Pegar o último template gerado
    const sampleTemplate = {
      name: 'Template IA',
      type: 'promocional',
      app: 'whatsapp',
      title: '🔥 OFERTA RELÂMPAGO!',
      body: 'Olá {{nome}}! Temos uma oferta especial só para você: {{desconto}}% de desconto em todos os produtos até {{data_fim}}!',
      footer: 'Não perca esta oportunidade!',
      variables: ['nome', 'desconto', 'data_fim'],
      buttons: ['Ver Ofertas', 'Falar com Vendedor']
    };
    
    onTemplateGenerated(sampleTemplate);
  };

  return (
    <Card className="h-96 flex flex-col">
      <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-white/20">
        <Bot className="text-blue-400" size={20} />
        <h3 className="font-semibold text-white">Chat com IA</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Botão para usar template (aparece após a IA responder) */}
        {messages.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleUseTemplate}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              ✨ Usar Este Template
            </button>
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/20 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite sua solicitação para a IA..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputText.trim()}
          className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-lg transition-colors duration-200"
        >
          <Send size={20} />
        </button>
      </div>
    </Card>
  );
};

export default AIChat;
