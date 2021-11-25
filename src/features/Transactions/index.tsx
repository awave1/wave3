import { useAllWaves } from "@wave3/domains/waveContract/hooks/useAllWaves";

export function Transactions() {
  const { data: waves } = useAllWaves();

  return (
    <ul className="flex overflow-auto space-x-10">
      {(waves ?? []).map((wave, index) => {
        return (
          <li
            className="rounded-xl ring-gray-600 bg-gradient-to-br from-pink-500 to-rose-500 my-5 p-6"
            key={index}
          >
            <div>
              <h3 className="font-bold uppercase text-gray-50">Address</h3>
              <code className="text-gray-50">{wave.fromUser}</code>
            </div>
            <div>
              <h3 className="font-bold uppercase text-gray-50">Time</h3>
              <code className="text-gray-50">{wave.timestamp.toString()}</code>
            </div>
            <div>
              <h3 className="font-bold uppercase text-gray-50">Message</h3>
              <code className="text-gray-50">{wave.message}</code>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
