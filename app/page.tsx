export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">

      <img
        src="/main_campus.jpg"
        alt="This is the main campus of TUD"
        className="w-full max-w-3xl rounded-xl shadow-md mb-6"
      />

      
      <div className="bg-yellow-100 hover:bg-yellow-200 transition p-8 rounded-2xl shadow-md max-w-2xl">

        <h1 className="text-4xl font-bold mb-4">
          Campus Companion
        </h1>

        <p className="text-amber-800 leading-relaxed">
          TUD has campuses all across dublin,like Grangegorman, Tallaght, and Blanchardstown and offers a wide range of programmes in area such as engineering, science business etc...
        </p>

        <br />

        <p className="text-amber-800 leading-relaxed">
          Campus Companion is a web application created to improve and manage campus life, it provides events, canteen menu, lost & found, help desk and recommendations.
        </p>

      </div>

    </main>
  );
}
