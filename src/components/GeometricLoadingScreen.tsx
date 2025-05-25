import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GeometricLoadingScreen = () => {
	const [progress, setProgress] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const [currentPhase, setCurrentPhase] = useState(0);
	const [colorPhase, setColorPhase] = useState(0);
	const [showConnections, setShowConnections] = useState(false);

	const name = "Pragyesh Kumar Seth";
	const title = "Full Stack Developer";

	// Loading phases with different messages
	const phases = [
		"Initializing workspace...",
		"Loading components...",
		"Establishing connections...",
		"Optimizing performance...",
		"Finalizing setup...",
		"Welcome aboard! ✨"
	];

	// Dynamic color schemes that change over time
	const colorSchemes = [
		{ primary: 'blue-400', secondary: 'purple-400', accent: 'cyan-400' },
		{ primary: 'purple-400', secondary: 'pink-400', accent: 'indigo-400' },
		{ primary: 'cyan-400', secondary: 'teal-400', accent: 'blue-400' },
		{ primary: 'emerald-400', secondary: 'green-400', accent: 'lime-400' },
		{ primary: 'orange-400', secondary: 'red-400', accent: 'yellow-400' },
	];

	// Enhanced geometric shapes with more variety
	const shapes = useMemo(() => [
		// Main focal shapes
		{ id: 0, type: 'circle', size: 12, x: 15, y: 20, complexity: 'high' },
		{ id: 1, type: 'square', size: 10, x: 75, y: 25, complexity: 'medium' },
		{ id: 2, type: 'triangle', size: 14, x: 25, y: 70, complexity: 'high' },
		{ id: 3, type: 'hexagon', size: 8, x: 80, y: 75, complexity: 'low' },
		{ id: 4, type: 'diamond', size: 11, x: 50, y: 15, complexity: 'medium' },
		{ id: 5, type: 'octagon', size: 9, x: 60, y: 80, complexity: 'high' },
		// Additional floating elements
		{ id: 6, type: 'circle', size: 6, x: 35, y: 45, complexity: 'low' },
		{ id: 7, type: 'square', size: 5, x: 85, y: 50, complexity: 'low' },
		{ id: 8, type: 'triangle', size: 7, x: 10, y: 60, complexity: 'medium' },
		{ id: 9, type: 'diamond', size: 8, x: 90, y: 30, complexity: 'medium' },
	], []);

	// Particle system for connections
	const particles = useMemo(() => 
		Array.from({ length: 20 }).map((_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 2 + 1,
			speed: Math.random() * 0.5 + 0.3,
			direction: Math.random() * Math.PI * 2,
		})), []
	);

	// Sound wave visualization data
	const soundWaves = useMemo(() => 
		Array.from({ length: 12 }).map((_, i) => ({
			id: i,
			amplitude: Math.random() * 20 + 10,
			frequency: Math.random() * 2 + 1,
			delay: i * 0.1,
		})), []
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => {
				const newProgress = Math.min(prev + 0.6, 100);
				
				// Update phase based on progress
				const phase = Math.floor((newProgress / 100) * (phases.length - 1));
				setCurrentPhase(phase);
				
				// Show connections after 30% progress
				if (newProgress > 30) setShowConnections(true);
				
				if (newProgress === 100) {
					setTimeout(() => setIsComplete(true), 800);
				}
				return newProgress;
			});
		}, 60);

		return () => clearInterval(interval);
	}, [phases.length]);

	// Color scheme rotation
	useEffect(() => {
		const colorInterval = setInterval(() => {
			setColorPhase(prev => (prev + 1) % colorSchemes.length);
		}, 3000);

		return () => clearInterval(colorInterval);
	}, [colorSchemes.length]);

	const currentColors = colorSchemes[colorPhase];

	const getShapeElement = (shape: { type: string; size: number }) => {
		const baseClasses = `border-2 bg-opacity-10`;
		const sizeClass = `w-${Math.floor(shape.size/2)*2} h-${Math.floor(shape.size/2)*2}`;
		
		switch (shape.type) {
			case 'circle':
				return `${baseClasses} ${sizeClass} rounded-full border-${currentColors.primary} bg-${currentColors.primary}`;
			case 'square':
				return `${baseClasses} ${sizeClass} border-${currentColors.secondary} bg-${currentColors.secondary}`;
			case 'triangle':
				return `${baseClasses} ${sizeClass} border-${currentColors.accent} bg-${currentColors.accent} transform rotate-45 clip-triangle`;
			case 'hexagon':
				return `${baseClasses} ${sizeClass} border-${currentColors.primary} bg-${currentColors.primary} transform rotate-30 clip-hexagon`;
			case 'diamond':
				return `${baseClasses} ${sizeClass} border-${currentColors.secondary} bg-${currentColors.secondary} transform rotate-45`;
			case 'octagon':
				return `${baseClasses} ${sizeClass} border-${currentColors.accent} bg-${currentColors.accent} clip-octagon`;
			default:
				return `${baseClasses} ${sizeClass} rounded-full border-${currentColors.primary} bg-${currentColors.primary}`;
		}
	};

	const getAnimationComplexity = (complexity: string, index: number) => {
		const base = {
			duration: 4 + index * 0.5,
			repeat: Infinity,
			ease: "easeInOut",
			delay: index * 0.3,
		};

		switch (complexity) {
			case 'high':
				return {
					...base,
					duration: base.duration + 2,
					y: [-30, 30, -30],
					rotate: [0, 360, 720],
					scale: [1, 1.4, 0.8, 1.2, 1],
					borderRadius: ['0%', '50%', '25%', '0%'],
				};
			case 'medium':
				return {
					...base,
					y: [-20, 20, -20],
					rotate: [0, 180, 360],
					scale: [1, 1.2, 1],
				};
			default:
				return {
					...base,
					y: [-10, 10, -10],
					rotate: [0, 90, 180],
					scale: [1, 1.1, 1],
				};
		}
	};

	return (
		<motion.div
			className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-[100] overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
			transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
		>
			{/* Enhanced floating geometric shapes */}
			<div className="absolute inset-0 overflow-hidden">
				{shapes.map((shape, i) => {
					const animation = getAnimationComplexity(shape.complexity, i);
					return (
						<motion.div
							key={shape.id}
							className="absolute"
							style={{
								left: `${shape.x}%`,
								top: `${shape.y}%`,
							}}
							animate={animation}
							transition={animation}
						>
							<motion.div
								className={getShapeElement(shape)}
								animate={{
									boxShadow: [
										`0 0 20px rgb(var(--${currentColors.primary}))`,
										`0 0 40px rgb(var(--${currentColors.primary})), 0 0 60px rgb(var(--${currentColors.secondary}))`,
										`0 0 20px rgb(var(--${currentColors.primary}))`,
									],
								}}
								transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
							/>
						</motion.div>
					);
				})}
			</div>

			{/* Particle system with connections */}
			<AnimatePresence>
				{showConnections && (
					<motion.div
						className="absolute inset-0 pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
							{/* Connection lines between shapes */}
							{shapes.slice(0, 6).map((shape, i) => {
								const nextShape = shapes[(i + 1) % 6];
								return (
									<motion.line
										key={`connection-${i}`}
										x1={shape.x}
										y1={shape.y}
										x2={nextShape.x}
										y2={nextShape.y}
										stroke={`rgb(var(--${currentColors.accent}))`}
										strokeWidth="0.1"
										className="opacity-30"
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{
											duration: 2,
											delay: i * 0.3,
											repeat: Infinity,
											repeatType: "reverse",
										}}
									/>
								);
							})}
						</svg>

						{/* Floating particles */}
						{particles.map((particle) => (
							<motion.div
								key={particle.id}
								className={`absolute rounded-full bg-${currentColors.primary} opacity-60`}
								style={{
									width: particle.size,
									height: particle.size,
									left: `${particle.x}%`,
									top: `${particle.y}%`,
								}}
								animate={{
									x: [0, Math.cos(particle.direction) * 50, 0],
									y: [0, Math.sin(particle.direction) * 50, 0],
									opacity: [0.3, 0.8, 0.3],
								}}
								transition={{
									duration: 4 / particle.speed,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Sound wave visualization */}
			<div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center gap-1 opacity-30">
				{soundWaves.map((wave) => (
					<motion.div
						key={wave.id}
						className={`w-1 bg-gradient-to-t from-${currentColors.primary} to-${currentColors.secondary} rounded-full`}
						animate={{
							height: [
								`${wave.amplitude}px`,
								`${wave.amplitude * 2}px`,
								`${wave.amplitude}px`,
							],
						}}
						transition={{
							duration: wave.frequency,
							repeat: Infinity,
							delay: wave.delay,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* Main content with enhanced animations */}
			<div className="text-center z-10 px-6 relative">
				{/* Name with sophisticated letter animation */}
				<motion.h1 className="text-4xl md:text-6xl font-bold mb-4 text-white relative">
					{name.split('').map((char, i) => (
						<motion.span
							key={i}
							initial={{ opacity: 0, y: 100, rotateX: -90 }}
							animate={{ 
								opacity: 1, 
								y: 0, 
								rotateX: 0,
								textShadow: [
									'0 0 0px rgba(255,255,255,0)',
									`0 0 20px rgb(var(--${currentColors.primary}))`,
									'0 0 0px rgba(255,255,255,0)',
								],
							}}
							transition={{ 
								delay: i * 0.08, 
								duration: 0.8,
								type: "spring",
								stiffness: 100,
								textShadow: { duration: 2, repeat: Infinity, delay: i * 0.1 }
							}}
							className="inline-block"
						>
							{char === ' ' ? '\u00A0' : char}
						</motion.span>
					))}
				</motion.h1>

				<motion.p
					className="text-xl text-slate-300 mb-8"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1.5, duration: 0.6 }}
				>
					{title}
				</motion.p>

				{/* Enhanced progress section */}
				<div className="space-y-4">
					{/* Current phase indicator */}
					<motion.div
						className={`text-sm text-${currentColors.accent} mb-4`}
						key={currentPhase}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
					>
						{phases[currentPhase]}
					</motion.div>

					{/* Multi-layered progress indicator */}
					<div className="relative w-80 mx-auto">
						{/* Background track */}
						<div className="h-2 bg-slate-700 rounded-full overflow-hidden">
							{/* Main progress bar */}
							<motion.div
								className={`h-full bg-gradient-to-r from-${currentColors.primary} via-${currentColors.secondary} to-${currentColors.accent} rounded-full relative`}
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							/>
							
							{/* Scanning light effect */}
							<motion.div
								className="absolute top-0 w-2 h-full bg-white opacity-80 rounded-full"
								style={{ left: `${Math.max(progress - 2, 0)}%` }}
								animate={{
									boxShadow: [
										'0 0 10px rgba(255,255,255,0.8)',
										'0 0 30px rgba(255,255,255,1)',
										'0 0 10px rgba(255,255,255,0.8)',
									],
								}}
								transition={{ duration: 1, repeat: Infinity }}
							/>
						</div>

						{/* Progress segments */}
						<div className="flex justify-between mt-2">
							{phases.slice(0, -1).map((_, i) => (
								<motion.div
									key={i}
									className={`w-2 h-2 rounded-full ${
										i <= currentPhase ? `bg-${currentColors.primary}` : 'bg-slate-600'
									}`}
									animate={{
										scale: i === currentPhase ? [1, 1.3, 1] : 1,
										boxShadow: i === currentPhase ? [
											'0 0 0px rgba(255,255,255,0)',
											`0 0 15px rgb(var(--${currentColors.primary}))`,
											'0 0 0px rgba(255,255,255,0)',
										] : 'none',
									}}
									transition={{ 
										duration: 0.8, 
										repeat: i === currentPhase ? Infinity : 0 
									}}
								/>
							))}
						</div>
					</div>

					{/* Enhanced progress percentage */}
					<motion.div
						className={`text-3xl font-mono text-${currentColors.primary} relative`}
						animate={{ 
							scale: [1, 1.05, 1],
							filter: [
								'brightness(1)',
								'brightness(1.2)',
								'brightness(1)',
							],
						}}
						transition={{ duration: 1.5, repeat: Infinity }}
					>
						{Math.round(progress)}%
						<motion.div
							className="absolute -inset-2 border border-current rounded opacity-20"
							animate={{ rotate: [0, 360] }}
							transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
						/>
					</motion.div>
				</div>

				{/* Enhanced completion message */}
				<AnimatePresence>
					{isComplete && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center"
							initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
							animate={{ opacity: 1, scale: 1, rotateY: 0 }}
							exit={{ opacity: 0, scale: 1.5 }}
							transition={{ duration: 1, type: "spring", stiffness: 100 }}
						>
							<div className="text-center relative">
								<motion.div
									className="text-6xl mb-6 relative"
									animate={{ 
										rotate: [0, 360],
										scale: [1, 1.2, 1],
									}}
									transition={{ 
										duration: 3, 
										repeat: Infinity, 
										ease: "easeInOut" 
									}}
								>
									✨
									<motion.div
										className="absolute inset-0 text-6xl"
										animate={{ 
											rotate: [0, -360],
											opacity: [0.5, 0.8, 0.5],
										}}
										transition={{ 
											duration: 2, 
											repeat: Infinity 
										}}
									>
										🚀
									</motion.div>
								</motion.div>
								
								<motion.p 
									className={`text-2xl text-${currentColors.primary} font-bold mb-2`}
									animate={{
										textShadow: [
											'0 0 10px rgba(255,255,255,0.5)',
											`0 0 30px rgb(var(--${currentColors.primary}))`,
											'0 0 10px rgba(255,255,255,0.5)',
										],
									}}
									transition={{ duration: 2, repeat: Infinity }}
								>
									Ready to explore!
								</motion.p>
								
								<motion.p 
									className="text-slate-300"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
								>
									Welcome to my digital universe
								</motion.p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Ambient lighting effects */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				animate={{
					background: [
						`radial-gradient(circle at 20% 30%, rgb(var(--${currentColors.primary})) 0%, transparent 50%)`,
						`radial-gradient(circle at 80% 70%, rgb(var(--${currentColors.secondary})) 0%, transparent 50%)`,
						`radial-gradient(circle at 50% 50%, rgb(var(--${currentColors.accent})) 0%, transparent 50%)`,
					],
				}}
				transition={{ duration: 8, repeat: Infinity }}
				style={{ opacity: 0.1 }}
			/>
		</motion.div>
	);
};

export default GeometricLoadingScreen;
