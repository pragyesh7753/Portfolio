import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Code2, Terminal, Cpu, Database, Globe, Monitor, Server } from 'lucide-react';

// Tech/Matrix theme with cyberpunk aesthetics

const LoadingScreen = () => {
	const [progress, setProgress] = useState(0);
	const [systemBooted, setSystemBooted] = useState(false);
	const [showMatrix, setShowMatrix] = useState(false);
	const [currentPhase, setCurrentPhase] = useState(0);
	const [typedText, setTypedText] = useState('');

	const fullName = 'Pragyesh Kumar Seth';
	const title = 'Full Stack Developer';

	// Tech loading phases with cyberpunk theme
	const loadingPhases = useMemo(() => [
		{ icon: Terminal, text: 'Initializing neural network...', color: 'text-green-400', code: 'sys.init()' },
		{ icon: Code2, text: 'Compiling quantum algorithms...', color: 'text-cyan-400', code: 'compile --optimize' },
		{ icon: Cpu, text: 'Overclocking matrix processors...', color: 'text-purple-400', code: 'cpu.overclock()' },
		{ icon: Database, text: 'Syncing blockchain databases...', color: 'text-blue-400', code: 'db.sync()' },
		{ icon: Globe, text: 'Establishing neural connections...', color: 'text-emerald-400', code: 'net.connect()' },
		{ icon: Monitor, text: 'Rendering holographic interface...', color: 'text-pink-400', code: 'render.start()' },
		{ icon: Server, text: 'System ready. Welcome to the matrix...', color: 'text-yellow-400', code: 'ready()' },
	], []);

	// Matrix falling code effect
	const matrixChars = useMemo(() => 
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|<>?/~`'.split(''),
	[]);

	const matrixColumns = useMemo(() => 
		Array.from({ length: 50 }).map((_, i) => ({
			id: i,
			x: (i * 2) + Math.random() * 2,
			chars: Array.from({ length: 20 }).map(() => 
				matrixChars[Math.floor(Math.random() * matrixChars.length)]
			),
			speed: 0.5 + Math.random() * 1.5,
			opacity: 0.3 + Math.random() * 0.7,
		})), 
	[matrixChars]);

	// Circuit board elements with fixed SVG paths
	const circuitPaths = useMemo(() => 
		Array.from({ length: 20 }).map((_, i) => {
			const x1 = Math.random() * 800;
			const y1 = Math.random() * 600;
			const x2 = Math.random() * 800;
			const y2 = Math.random() * 600;
			const cx = Math.random() * 800;
			const cy = Math.random() * 600;
			
			return {
				id: i,
				path: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,
				color: ['stroke-green-400', 'stroke-cyan-400', 'stroke-blue-400', 'stroke-purple-400'][Math.floor(Math.random() * 4)],
				delay: Math.random() * 2,
			};
		}),
	[]);

	// Binary rain effect
	const binaryRain = useMemo(() => 
		Array.from({ length: 30 }).map((_, i) => ({
			id: i,
			x: Math.random() * 100,
			binary: Array.from({ length: 15 }).map(() => Math.random() > 0.5 ? '1' : '0').join(''),
			speed: 2 + Math.random() * 3,
			delay: Math.random() * 5,
		})),
	[]);

	// Progress and system boot
	useEffect(() => {
		let interval: NodeJS.Timeout;
		let bootTimeout: NodeJS.Timeout;
		let matrixTimeout: NodeJS.Timeout;

		interval = setInterval(() => {
			setProgress((p) => {
				const newProgress = Math.min(p + 0.8, 100);
				if (newProgress >= 100) {
					clearInterval(interval);
					bootTimeout = setTimeout(() => setSystemBooted(true), 500);
					matrixTimeout = setTimeout(() => setShowMatrix(true), 1000);
				}
				return newProgress;
			});
		}, 60);

		return () => {
			clearInterval(interval);
			if (bootTimeout) clearTimeout(bootTimeout);
			if (matrixTimeout) clearTimeout(matrixTimeout);
		};
	}, []);

	// Update current phase based on progress
	useEffect(() => {
		if (loadingPhases.length > 0) {
			const phase = Math.min(
				Math.floor((progress / 100) * loadingPhases.length),
				loadingPhases.length - 1
			);
			setCurrentPhase(phase);
		}
	}, [progress, loadingPhases.length]);

	// Typing effect for current phase with proper cleanup
	useEffect(() => {
		let typeInterval: NodeJS.Timeout;
		
		if (loadingPhases[currentPhase]) {
			const text = loadingPhases[currentPhase].text;
			let index = 0;
			setTypedText('');
			
			typeInterval = setInterval(() => {
				if (index < text.length) {
					setTypedText(text.slice(0, index + 1));
					index++;
				} else {
					clearInterval(typeInterval);
				}
			}, 50);
		}

		return () => {
			if (typeInterval) clearInterval(typeInterval);
		};
	}, [currentPhase, loadingPhases]);

	return (
		<motion.div
			className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-[100] overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				scale: 1.1,
				transition: {
					duration: 1,
					ease: [0.2, 0.65, 0.3, 0.9],
				},
			}}
			role="dialog"
			aria-label="Loading screen"
			aria-live="polite"
		>
			{/* Matrix falling code background */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{matrixColumns.map((column) => (
					<motion.div
						key={column.id}
						className="absolute top-0 text-green-400 font-mono text-xs opacity-20 select-none"
						style={{ left: `${Math.min(Math.max(column.x, 0), 98)}%` }}
						animate={{ y: ['-100vh', '100vh'] }}
						transition={{
							duration: 10 / column.speed,
							repeat: Infinity,
							ease: 'linear',
							delay: Math.random() * 5,
						}}
						aria-hidden="true"
					>
						{column.chars.map((char, i) => (
							<motion.div
								key={i}
								className="leading-3"
								animate={{ opacity: [column.opacity, 0.1, column.opacity] }}
								transition={{
									duration: 0.5,
									repeat: Infinity,
									delay: i * 0.1,
								}}
							>
								{char}
							</motion.div>
						))}
					</motion.div>
				))}
			</div>

			{/* Binary rain effect */}
			<AnimatePresence>
				{showMatrix && (
					<motion.div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						aria-hidden="true"
					>
						{binaryRain.map((rain) => (
							<motion.div
								key={rain.id}
								className="absolute text-cyan-400/30 font-mono text-xs select-none"
								style={{ 
									left: `${Math.min(Math.max(rain.x, 0), 95)}%`, 
									top: '0%',
									whiteSpace: 'nowrap'
								}}
								animate={{ y: ['0vh', '100vh'] }}
								transition={{
									duration: rain.speed,
									repeat: Infinity,
									ease: 'linear',
									delay: rain.delay,
								}}
							>
								{rain.binary}
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Circuit board background */}
			<div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
				<svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
					{circuitPaths.map((circuit) => (
						<motion.path
							key={circuit.id}
							d={circuit.path}
							fill="none"
							strokeWidth="1"
							className={cn('opacity-60', circuit.color)}
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 0.6 }}
							transition={{
								duration: 2,
								delay: circuit.delay,
								repeat: Infinity,
								repeatType: 'reverse',
							}}
						/>
					))}
				</svg>
			</div>

			{/* Central terminal interface */}
			<motion.div
				className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.3 }}
			>
				{/* Terminal window */}
				<motion.div
					className="bg-black/80 border border-green-400/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm shadow-2xl shadow-green-400/20"
					initial={{ y: 30 }}
					animate={{ y: 0 }}
					transition={{ delay: 0.5 }}
				>
					{/* Terminal header */}
					<div className="flex items-center gap-2 mb-4 pb-2 border-b border-green-400/30">
						<div className="flex gap-1">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div className="w-3 h-3 rounded-full bg-green-500"></div>
						</div>
						<span className="text-green-400 font-mono text-xs sm:text-sm ml-2 truncate">
							neural-net-terminal v2.7.3
						</span>
					</div>

					{/* Name display with glitch effect */}
					<motion.div
						className="text-center mb-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						<motion.h1
							className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 font-mono leading-tight"
							animate={{
								textShadow: [
									'0 0 10px #00ff00',
									'0 0 20px #00ff00, 0 0 30px #00ff00',
									'0 0 10px #00ff00',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 break-words">
								{fullName}
							</span>
						</motion.h1>

						<motion.p
							className="text-base sm:text-xl text-green-300/80 font-mono tracking-wider"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1 }}
						>
							{title}
						</motion.p>

						<motion.div
							className="text-xs sm:text-sm text-cyan-400/60 font-mono mt-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2 }}
						>
							{'> '} Accessing neural interface protocols...
						</motion.div>
					</motion.div>

					{/* Progress section */}
					<div className="space-y-4">
						{/* Progress bar */}
						<div className="relative">
							<div className="flex items-center gap-3 mb-2">
								<span className="text-green-400 font-mono text-xs sm:text-sm">PROGRESS:</span>
								<motion.span
									className="text-cyan-400 font-mono text-xs sm:text-sm"
									animate={{ opacity: [1, 0.5, 1] }}
									transition={{ duration: 1, repeat: Infinity }}
								>
									{Math.round(progress)}%
								</motion.span>
							</div>
							
							<div className="relative h-3 sm:h-4 bg-gray-800 border border-green-400/30 rounded overflow-hidden">
								<motion.div
									className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 rounded"
									initial={{ width: '0%' }}
									animate={{ width: `${progress}%` }}
									transition={{ duration: 0.3, ease: 'easeOut' }}
									role="progressbar"
									aria-valuenow={progress}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
								
								{/* Scanning line effect */}
								<motion.div
									className="absolute top-0 w-0.5 sm:w-1 h-full bg-white/80"
									style={{ left: `${Math.max(progress - 1, 0)}%` }}
									animate={{
										boxShadow: [
											'0 0 5px #ffffff',
											'0 0 15px #ffffff, 0 0 25px #ffffff',
											'0 0 5px #ffffff',
										],
									}}
									transition={{ duration: 0.8, repeat: Infinity }}
								/>
							</div>
						</div>

						{/* Current phase display */}
						<motion.div
							className="flex items-center gap-3 p-3 bg-gray-900/50 border border-green-400/20 rounded"
							key={currentPhase}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
						>
							{loadingPhases[currentPhase] && (
								<>
									<motion.div
										className={cn('flex items-center flex-shrink-0', loadingPhases[currentPhase].color)}
										animate={{ rotate: [0, 360] }}
										transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
									>
										{React.createElement(loadingPhases[currentPhase].icon, {
											className: 'w-4 h-4 sm:w-5 sm:h-5',
										})}
									</motion.div>

									<div className="flex-1 min-w-0">
										<div className="font-mono text-xs sm:text-sm text-white/90 break-words">
											{'> '}{typedText}
											<motion.span
												className="text-green-400"
												animate={{ opacity: [1, 0] }}
												transition={{ duration: 0.8, repeat: Infinity }}
											>
												_
											</motion.span>
										</div>
										<div className="font-mono text-xs text-gray-400 mt-1 break-all">
											$ {loadingPhases[currentPhase].code}
										</div>
									</div>
								</>
							)}
						</motion.div>

						{/* System status */}
						<motion.div
							className="grid grid-cols-2 gap-2 sm:gap-4 mt-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.5 }}
							aria-label="System status"
						>
							<div className="text-xs font-mono space-y-1">
								<div className="text-green-400">CPU: {progress > 20 ? 'ONLINE' : 'OFFLINE'}</div>
								<div className="text-cyan-400">RAM: {progress > 40 ? 'OPTIMIZED' : 'LOADING'}</div>
								<div className="text-blue-400">NET: {progress > 60 ? 'CONNECTED' : 'CONNECTING'}</div>
							</div>
							<div className="text-xs font-mono space-y-1">
								<div className="text-purple-400">GPU: {progress > 80 ? 'ACCELERATED' : 'BOOTING'}</div>
								<div className="text-pink-400">SYS: {progress >= 100 ? 'READY' : 'INITIALIZING'}</div>
								<div className="text-yellow-400">AI: {systemBooted ? 'ACTIVE' : 'STANDBY'}</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			{/* System boot complete message */}
			<AnimatePresence>
				{systemBooted && (
					<motion.div
						className="absolute bottom-4 sm:bottom-10 left-4 right-4 flex justify-center z-20"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 30 }}
						transition={{ duration: 0.8 }}
						role="alert"
						aria-live="assertive"
					>
						<motion.div
							className="bg-green-400/10 border border-green-400/50 rounded-lg px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm max-w-md"
							animate={{
								boxShadow: [
									'0 0 20px rgba(34, 197, 94, 0.3)',
									'0 0 40px rgba(34, 197, 94, 0.5)',
									'0 0 20px rgba(34, 197, 94, 0.3)',
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<div className="text-green-400 font-mono text-center">
								<div className="text-sm sm:text-lg font-bold">⚡ SYSTEM BOOT COMPLETE ⚡</div>
								<div className="text-xs sm:text-sm">Neural network established • Welcome to the matrix</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Glitch overlay effect */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				animate={{
					background: [
						'linear-gradient(90deg, transparent 98%, rgba(0, 255, 0, 0.1) 100%)',
						'linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.1) 2%, transparent 4%)',
					],
				}}
				transition={{
					duration: 0.1,
					repeat: Infinity,
					repeatType: 'mirror',
					times: [0, 1],
				}}
				aria-hidden="true"
			/>
		</motion.div>
	);
};

export default LoadingScreen;
