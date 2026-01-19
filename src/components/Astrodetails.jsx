import React from "react";

const Astrodetails = () => {

    const bars = [
        { star: 5, width: "w-full", color: "bg-green-500" },
        { star: 4, width: "w-4/5", color: "bg-blue-500" },
        { star: 3, width: "w-3/5", color: "bg-gray-300" },
        { star: 2, width: "w-2/5", color: "bg-gray-200" },
        { star: 1, width: "w-1/5", color: "bg-gray-200" },
    ];

    return (
        <>
            {/* Profile Card */}
            <div className="max-w-5xl mx-auto border rounded-xl p-6 bg-white shadow-sm mt-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full overflow-hidden border">
                            <img
                                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="mt-3 bg-yellow-400 text-black text-sm px-4 py-1 rounded-full">
                            Follow
                        </button>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            Magizhan
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </h2>
                        <p className="text-sm text-gray-600">Vedic, Life Coach</p>
                        <p className="text-sm text-gray-600">English, Tamil</p>
                        <p className="text-sm text-gray-600">Exp: 5 Years</p>

                        <p className="mt-2 font-semibold">₹ 24/min</p>

                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>💬 16K mins</span>
                            <span>📞 2K mins</span>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button className="border border-green-500 text-green-600 px-6 py-2 rounded-full text-sm">
                                Start Chat
                            </button>
                            <button className="border border-gray-400 text-gray-500 px-6 py-2 rounded-full text-sm">
                                Start Call
                                <span className="block text-xs text-red-500">
                                    Currently offline
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    {[
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                        "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
                    ].map((img, i) => (
                        <div key={i} className="h-40 rounded-lg overflow-hidden border">
                            <img src={img} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* About */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">About me</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Magizhan, an adept Vedic Astrologer in India, is driven by a deep
                        desire to assist clients in need. His spirit-guided readings, rooted
                        in Astrology ethics, aim to bring stability to people's lives.
                        Magizhan provides clarity and insight, empowering clients with
                        spiritual knowledge about energies.
                    </p>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-5xl mx-auto mt-8 mb-10">
                <div className="border rounded-xl p-4 w-full">
                    <h3 className="font-semibold mb-3">Rating & Reviews</h3>

                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">4.98</p>
                            <div className="text-yellow-400 text-sm">★★★★★</div>
                            <p className="text-xs text-gray-500 mt-1">4,289 total</p>
                        </div>

                        <div className="flex-1 space-y-2">
                            {bars.map((b) => (
                                <div key={b.star} className="flex items-center gap-2">
                                    <span className="text-xs w-3">{b.star}</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded">
                                        <div className={`h-2 rounded ${b.color} ${b.width}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="w-full mt-4 border rounded-lg p-2 text-sm text-gray-600 flex justify-between items-center">
                        Chat with Assistant?
                        <span>›</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Astrodetails;
