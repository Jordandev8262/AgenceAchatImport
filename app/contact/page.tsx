'use client'

import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle } from 'react-icons/fi'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: Message = {
      id: chatMessages.length + 1,
      text: chatInput,
      sender: 'user',
      timestamp: new Date(),
    }

    setChatMessages([...chatMessages, userMessage])
    setChatInput('')

    // Réponse automatique simulée
    setTimeout(() => {
      const botResponse: Message = {
        id: chatMessages.length + 2,
        text: "Merci pour votre message. Un de nos conseillers vous répondra bientôt. Pour une assistance immédiate, appelez-nous au +33 1 23 45 67 89.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Contactez-nous</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <FiSend />
                <span>{isSubmitting ? 'Envoi...' : 'Envoyer le message'}</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      République Democratique Of Congo<br />
                      Kinshasa
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      +243 982 345 963<br />
                      Du lundi au vendredi, 9h-18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">
                      digishopfrance@gmail.com<br />
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Button */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center space-x-2"
            >
              <FiMessageCircle />
              <span>Chat en direct</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col" style={{ height: '500px' }}>
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiMessageCircle />
              <span className="font-semibold">Chat en direct</span>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <FiSend />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

