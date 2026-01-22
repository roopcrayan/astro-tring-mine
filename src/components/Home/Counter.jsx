import React from 'react'

const Counter = () => {
    return (
        <section className='py-0'>
            <div className="container">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 text-center bg-primary/20 p-10 rounded-2xl border border-secondary">

                    <div>
                        <h2 className="text-4xl font-bold text-black">500K+</h2>
                        <p className="mt-2 text-lg font-medium">Happy Customers</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-black">1M+</h2>
                        <p className="mt-2 text-lg font-medium">Consultations Delivered</p>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-black">1M+</h2>
                        <p className="mt-2 text-lg font-medium">Consultations Delivered</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-black">1M+</h2>
                        <p className="mt-2 text-lg font-medium">Consultations Delivered</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Counter