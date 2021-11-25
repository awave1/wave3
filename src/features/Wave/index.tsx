import { Loading } from "features/Wave/components/Loading";
import { useWave } from "features/Wave/useWave";

export function Wave() {
  const {
    handlers: { onMessageInput, onWaveClicked },
    models: { mining, waveCount, waveHash, message },
  } = useWave();

  if (mining) {
    return <Loading hash={waveHash} />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-center my-3 text-gray-50 text-2xl font-extrabold">
        {`Total Waves: ${waveCount}`}
      </h2>
      <div className="flex flex-col min-w-80 max-w-3/4 my-0 mx-auto">
        <textarea
          className="block resize-none appearance-nonebg-gray-100 placeholder-gray-600 focus:placeholder-gray-400 border rounded rounded-b-none py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          maxLength={140}
          placeholder="You can even include a message..."
          value={message}
          onChange={onMessageInput}
        />
        <button
          className="self-start w-full py-2 px-4 bg-gray-200 text-gray-900 uppercase font-semibold rounded-lg rounded-t-none shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          onClick={onWaveClicked}
        >{`Wave at me`}</button>
      </div>
    </div>
  );
}
