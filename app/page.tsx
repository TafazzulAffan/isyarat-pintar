import { FloatingBall } from '@/components/floating-ball'
import Image from 'next/image'

export default function LoginPage() {
	return (
		<main className="h-screen bg-[#0a1f29] p-0">
			<section className="flex h-screen w-screen overflow-hidden bg-[#093140]">
				<div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#125f69_0%,#08293a_35%,#041d2c_100%)] px-10 py-12 lg:flex">
					{/* Floating Balls Background */}
					<FloatingBall 
						size={180} 
						color="#22d3ee" 
						blur={60} 
						opacity={0.4}
						className="left-[5%] top-[10%]"
					/>
					<FloatingBall 
						size={140} 
						color="#86efac" 
						blur={50} 
						opacity={0.35}
						className="right-[10%] top-[50%]"
					/>
					<FloatingBall 
						size={160} 
						color="#10b981" 
						blur={55} 
						opacity={0.3}
						className="left-[15%] bottom-[15%]"
					/>
					<FloatingBall 
						size={120} 
						color="#06b6d4" 
						blur={45} 
						opacity={0.32}
						className="right-[20%] bottom-[25%]"
					/>

					{/* Additional Floating Balls */}
					<FloatingBall 
						size={112} 
						color="#ffffff" 
						blur={20} 
						opacity={0.85}
						className="left-[8%] top-[6%]"
					/>
					<FloatingBall 
						size={80} 
						color="#bef264" 
						blur={12} 
						opacity={0.8}
						className="left-[14%] top-[42%]"
					/>
					<FloatingBall 
						size={96} 
						color="#bef264" 
						blur={12} 
						opacity={0.8}
						className="right-[14%] top-[18%]"
					/>
					<FloatingBall 
						size={96} 
						color="#bef264" 
						blur={12} 
						opacity={0.8}
						className="left-[5%] bottom-[10%]"
					/>
					<FloatingBall 
						size={80} 
						color="#ffffff" 
						blur={20} 
						opacity={0.85}
						className="right-[18%] bottom-[11%]"
					/>
					<FloatingBall 
						size={64} 
						color="#ffffff" 
						blur={12} 
						opacity={0.7}
						className="left-[28%] top-[58%]"
					/>
					<FloatingBall 
						size={128} 
						color="#10b981" 
						blur={25} 
						opacity={0.4}
						className="right-[28%] top-[40%]"
					/>

					<div className="relative z-10 mx-auto text-center text-white">
						<div className="mb-3">
							<div className="flex h-125 w-125 items-center justify-center">
								<Image 
									src="/assets/logo/IP-Loginlogo.png"
									alt="IsyaratPintar Logo"
									width={384}
									height={384}
									className="w-full h-full object-contain"
									priority
								/>
							</div>		
						</div>
						<h2 className="mx-auto max-w-xl text-2xl font-semibold leading-tight">
							Menghubungkan Ilmu Pengetahuan
							<br />
							ke Seluruh Indera.
						</h2>
						<p className="mx-auto mt-4 max-w-lg text-sm text-white/90">
							Selamat datang di IsyaratPintar. Mari lanjutkan petualangan belajarmu hari ini.
						</p>
					</div>
				</div>

				<div className="w-full bg-[#ededed] px-6 py-10 sm:px-10 lg:w-[400px] lg:rounded-l-[28px]">
                    <div className="flex w-full max-w-sm items-start mb-10">
                        <div className="mb-6">
                            <h3 className="text-4xl font-extrabold text-[#043b3f]">IsyaratPintar</h3>
                            <p className="text-3xl font-bold text-lime-500">E-Learning</p>
                        </div>
                    </div>

					<div className="flex mx-auto w-full max-w-sm flex-col items-center justify-center mt-[125px]">
						<div className="text-center">
							<h4 className="text-5xl font-bold text-black">Log In</h4>
							<p className="mt-2 text-base text-black/70">Silahkan Masuk ke Akun Anda</p>
						</div>

						<form className="mt-8 w-full space-y-4">
							<div>
								<label htmlFor="username" className="mb-1.5 block text-sm font-medium text-black/80">
									Username
								</label>
								<input
									id="username"
									type="text"
									placeholder="Enter Username"
									className="h-11 w-full rounded-lg border border-black/30 bg-white px-4 text-sm text-black outline-none transition focus:border-[#064e4f] focus:ring-2 focus:ring-[#0f766e]/20"
								/>
							</div>

							<div>
								<label htmlFor="password" className="mb-1.5 block text-sm font-medium text-black/80">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Enter Password"
									className="h-11 w-full rounded-lg border border-black/30 bg-white px-4 text-sm text-black outline-none transition focus:border-[#064e4f] focus:ring-2 focus:ring-[#0f766e]/20"
								/>
							</div>

							<button
								type="submit"
								className="mt-2 h-11 w-full rounded-lg bg-[#014f52] text-sm font-semibold text-white transition hover:bg-[#026266]"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</section>
		</main>
	)
}
