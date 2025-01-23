import React, { useState, useRef } from 'react';

function Briefing() {
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    familyMembers: '',
    visitsAndParties: '',
    commonHobbies: '',
    stylePreference: '',
    styleJustification: '',
    texturePreference: [],
    ceilingMaterial: '',
    lightingPreference: [],
    floorPreference: [],
    vegetationPreference: '',
    otherVegetation: '',
    reuseDetails: '',
    furnitureImages: [] as File[]
  });

  const questions = [
    {
      id: 'familyMembers',
      title: 'Escriba el nombre y la edad de todos los integrantes de la familia. Incluye mascotas (si tiene)',
      type: 'textarea',
      minLength: 30
    },
    {
      id: 'visitsAndParties',
      title: 'Tiene la costumbre de recibir visitas y/o hacer fiestas ? Para cuantas personas?',
      type: 'textarea',
      minLength: 30
    },
    {
      id: 'commonHobbies',
      title: 'Posee algún hobby en común ? (Ej.: Leer, ver televisión, comidas familiares, cantar, bailar, cocinar, barbacoas, instrumentos y gustos musicales, etc.)',
      type: 'textarea',
      minLength: 30
    },
    {
      id: 'stylePreference',
      title: 'Elije de entre las imagenes de abajo, el estilo que más le represente',
      type: 'imageSelectWithText',
      options: [
        { id: 'minimalist', label: 'Minimalista', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=500' },
        { id: 'modern', label: 'Moderno', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=500' },
        { id: 'classic', label: 'Clásico', image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=500' },
        { id: 'industrial', label: 'Industrial', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500' },
        { id: 'retro', label: 'Retro', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=500' },
        { id: 'rustic', label: 'Rústico', image: 'https://images.unsplash.com/photo-1600573472591-ee6c8e695394?auto=format&fit=crop&q=80&w=500' },
        { id: 'other', label: 'Otro', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500' }
      ],
      justification: true
    },
    {
      id: 'texturePreference',
      title: 'Que texturas le agrada?',
      type: 'imageSelect',
      options: [
        { id: 'cement', label: 'Cementicio', image: 'https://images.unsplash.com/photo-1600573472591-ee6c8e695394?auto=format&fit=crop&q=80&w=500' },
        { id: 'clean', label: 'Superficios Lisas/Clean', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500' },
        { id: 'wallpaper', label: 'Papel de Pared', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500' },
        { id: '3d', label: 'Revestimiento 3D', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=500' },
        { id: 'marble', label: 'Marmolizado', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500' }
      ]
    },
    {
      id: 'ceilingMaterial',
      title: 'De que material desea el cieloraso?',
      type: 'select',
      options: [
        { id: 'gypsum', label: 'Yeso' },
        { id: 'pvc', label: 'PVC' },
        { id: 'wood', label: 'Madera' }
      ]
    },
    {
      id: 'lightingPreference',
      title: 'Que tipo de iluminacion prefiere?',
      type: 'imageSelect',
      options: [
        { id: 'embedded', label: 'Embutido en cieloraso de yeso', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500' },
        { id: 'surface', label: 'de Sobreponer', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=500' },
        { id: 'other', label: 'Otro', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=500' }
      ]
    },
    {
      id: 'floorPreference',
      title: 'Que tipo de piso prefiere para los ambientes en general?',
      type: 'imageSelect',
      options: [
        { id: 'porcelain', label: 'Porcelanato', image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&q=80&w=500' },
        { id: 'marbleporcelain', label: 'Porcelanato marmolizado', image: 'https://images.unsplash.com/photo-1600566752584-e635346a6d2f?auto=format&fit=crop&q=80&w=500' },
        { id: 'woodporcelain', label: 'Porcelanato amaderado', image: 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?auto=format&fit=crop&q=80&w=500' },
        { id: 'laminate', label: 'Piso laminado', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500' },
        { id: 'vinyl', label: 'Piso Vinílico', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500' },
        { id: 'other', label: 'Otro', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=500' }
      ]
    },
    {
      id: 'vegetationPreference',
      title: 'Alguna vegetacion de su preferencia?',
      type: 'radioWithOther',
      options: [
        { id: 'flowersAndFoliage', label: 'Flores y follajes' },
        { id: 'foliageOnly', label: 'Apenas follaje' },
        { id: 'permanent', label: 'Permanentes' },
        { id: 'natural', label: 'Naturales' },
        { id: 'noFlowers', label: 'No me gustan las flores' },
        { id: 'other', label: 'Otro' }
      ]
    },
    {
      id: 'reuseDetails',
      title: 'Posee de algun mueble que desea reutilizar. Si es sí añade la imagen con las medidas generales aqui.',
      type: 'fileUpload'
    }
  ];

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        furnitureImages: [...prev.furnitureImages, ...Array.from(files)]
      }));
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    
    if (currentQuestion.type === 'textarea' && currentQuestion.minLength) {
      if (formData[currentQuestion.id].length < currentQuestion.minLength) {
        alert(`Por favor, ingrese al menos ${currentQuestion.minLength} caracteres.`);
        return;
      }
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case 'textarea':
        return (
          <div className="space-y-2">
            <textarea
              className="w-full px-4 py-3 bg-black/5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arrua-gold focus:border-arrua-gold text-arrua-black"
              rows={4}
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              minLength={question.minLength}
            />
            {question.minLength && (
              <p className="text-sm text-arrua-gray">
                Mínimo {question.minLength} caracteres. Actual: {formData[question.id]?.length || 0}
              </p>
            )}
          </div>
        );

      case 'imageSelectWithText':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {question.options.map((option: any) => (
                <div key={option.id} className="relative">
                  <input
                    type="radio"
                    id={option.id}
                    name={question.id}
                    value={option.id}
                    className="sr-only peer"
                    checked={formData[question.id] === option.id}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                  />
                  <label
                    htmlFor={option.id}
                    className="block cursor-pointer overflow-hidden rounded-lg border-2 peer-checked:border-arrua-gold peer-checked:ring-2 peer-checked:ring-arrua-gold"
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2 text-center bg-black/5">
                      <span className="text-sm font-medium text-arrua-black">{option.label}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            {question.justification && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-arrua-black mb-2">
                  Describe o justifica que te agrada de la selección de estilo
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-black/5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arrua-gold focus:border-arrua-gold text-arrua-black"
                  rows={4}
                  value={formData.styleJustification || ''}
                  onChange={(e) => handleInputChange('styleJustification', e.target.value)}
                  minLength={30}
                />
                <p className="text-sm text-arrua-gray mt-1">
                  Mínimo 30 caracteres. Actual: {formData.styleJustification?.length || 0}
                </p>
              </div>
            )}
          </div>
        );

      case 'imageSelect':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {question.options.map((option: any) => (
              <div key={option.id} className="relative">
                <input
                  type="radio"
                  id={option.id}
                  name={question.id}
                  value={option.id}
                  className="sr-only peer"
                  checked={formData[question.id] === option.id}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
                <label
                  htmlFor={option.id}
                  className="block cursor-pointer overflow-hidden rounded-lg border-2 peer-checked:border-arrua-gold peer-checked:ring-2 peer-checked:ring-arrua-gold"
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-center bg-black/5">
                    <span className="text-sm font-medium text-arrua-black">{option.label}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            className="w-full px-4 py-3 bg-black/5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arrua-gold focus:border-arrua-gold text-arrua-black"
            value={formData[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            {question.options.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radioWithOther':
        return (
          <div className="space-y-4">
            {question.options.map((option: any) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name={question.id}
                  value={option.id}
                  className="h-4 w-4 text-arrua-gold focus:ring-arrua-gold border-gray-300"
                  checked={formData[question.id] === option.id}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
                <label htmlFor={option.id} className="ml-2 text-sm font-medium text-arrua-black">
                  {option.label}
                </label>
              </div>
            ))}
            {formData[question.id] === 'other' && (
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 bg-black/5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arrua-gold focus:border-arrua-gold text-arrua-black"
                placeholder="Especifique otro"
                value={formData.otherVegetation || ''}
                onChange={(e) => handleInputChange('otherVegetation', e.target.value)}
              />
            )}
          </div>
        );

      case 'fileUpload':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-black/5 text-arrua-black rounded-lg tracking-wide uppercase border-2 border-arrua-gold cursor-pointer hover:bg-arrua-gold hover:text-black transition duration-300">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Seleccionar archivo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                />
              </label>
            </div>
            {formData.furnitureImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-arrua-black mb-2">Archivos seleccionados:</h4>
                <ul className="space-y-2">
                  {formData.furnitureImages.map((file, index) => (
                    <li key={index} className="text-sm text-arrua-gray">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border border-arrua-gold/20">
          <h1 className="text-3xl font-bold text-arrua-black mb-2">Briefing de Proyecto</h1>
          <p className="text-arrua-gray mb-8">Complete el siguiente formulario para ayudarnos a entender mejor sus necesidades</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Progress Bar */}
            <div className="w-full bg-black/10 rounded-full h-2.5">
              <div
                className="bg-arrua-gold h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Step Counter */}
            <div className="text-sm text-arrua-gray text-center">
              Paso {currentStep + 1} de {questions.length}
            </div>

            {/* Current Question */}
            <div className="space-y-6">
              <label className="block text-lg font-medium text-arrua-black mb-4">
                {questions[currentStep].title}
              </label>
              {renderQuestion(questions[currentStep])}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                  currentStep === 0
                    ? 'bg-black/5 text-arrua-gray cursor-not-allowed'
                    : 'bg-black text-white hover:bg-arrua-black'
                }`}
                disabled={currentStep === 0}
              >
                Anterior
              </button>
              {currentStep === questions.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-arrua-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition duration-300"
                >
                  Enviar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-arrua-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition duration-300"
                >
                  Siguiente
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Briefing;