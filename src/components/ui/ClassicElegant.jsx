
export default function ClassicElegant({ data }) {
  // Verificamos si tenemos datos de la boda (depende de tu serializer)
  const weddingName = data.wedding?.couple_names || "Nuestra Boda";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-serif">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-200">
        
        {/* Cabecera */}
        <div className="bg-slate-900 text-white p-8 text-center">
          <p className="uppercase tracking-widest text-xs mb-2">Te invitan a la boda de</p>
          <h1 className="text-3xl font-bold">{weddingName}</h1>
        </div>

        {/* Cuerpo */}
        <div className="p-8">
          <p className="text-center text-slate-600 mb-6">
            Hola <span className="font-bold text-slate-800">{data.family_name}</span>,<br/>
            nos encantaría contar con su presencia.
          </p>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-slate-400 border-b pb-2">Lista de Invitados</h3>
            {data.guests.map((guest) => (
              <div key={guest.id} className="flex justify-between items-center py-2">
                <span className="text-lg">{guest.full_name}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  guest.attendance === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                  guest.attendance === 'DECLINED' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {guest.attendance === 'PENDING' ? 'Pendiente' : 
                   guest.attendance === 'ACCEPTED' ? 'Asistirá' : 'No asistirá'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer provisional */}
        <div className="bg-slate-100 p-4 text-center">
          <button className="bg-slate-900 text-white px-6 py-2 rounded hover:bg-slate-700 transition">
            Confirmar Asistencia
          </button>
        </div>

      </div>
    </div>
  );
}