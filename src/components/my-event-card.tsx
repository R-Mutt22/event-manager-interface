import { MyEventData as MyEventCardProp } from "@/utils/my-event-data";

export default function MyEventCard(event: MyEventCardProp) {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl hover:border hover:border-indigo-100">
      <h3 className="font-bold mb-4 text-xl text-center">{event.title}</h3>
      <div className="flex gap-6 justify-center">
            <div className="px-4 py-2 rounded basis-[50%] bg-white mb-4">
                <h6 className="font-semibold text-center mb-2"> Bóveda del Evento</h6>
                <div>
                    <p>Precio token: {event.token_price}</p>
                    <p>Colaboradores: {event.collaborators}</p>
                    <p>Total: {event.event_vault_total}</p>
                </div>
            </div>
            <div className="px-4 py-2 rounded basis-[50%] bg-white mb-4">
                <h6 className="font-semibold text-center mb-2"> Bóveda de Ganancias</h6>
                <div>
                    <p>Precio ticket: {event.ticket_price}</p>
                    <p>Tickets vendidos: {event.tickets_sold}</p>
                    <p>Total: {event.gain_vault_total}</p>
                </div>
            </div>
        </div>
      <div className="flex gap-6 justify-end">
        
        <button className="bg-indigo-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-indigo-400"
                onClick={() => alert("Próximamente")}>
          Retirar Fondos 
        </button>
        {
            !event.closed && (
                <button className="bg-red-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-red-400"
                onClick={() => alert("Próximamente")}>
                    Cerrar Evento 
                </button>
            )
        }
      </div>
    </div>
  );
}