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

	// Enhanced loading phases with tech-themed messages
	const phases = [
		"⚡ Booting quantum cores...",
		"🔮 Materializing components...",
		"🌌 Establishing neural networks...",
		"🚀 Optimizing warp drives...",
		"✨ Calibrating reality matrix...",
		"🎯 Welcome to the metaverse! ✨"
	];

	// Fixed color schemes with static classes
	const colorSchemes = [
		{ 
			primary: '#22d3ee', 
			secondary: '#3b82f6', 
			accent: '#a855f7',
			primaryRgb: '34, 211, 238',
			secondaryRgb: '59, 130, 246',
			accentRgb: '168, 85, 247',
			bg: 'from-blue-900 via-purple-900 to-black' 
		},
		{ 
			primary: '#34d399', 
			secondary: '#14b8a6', 
			accent: '#22d3ee',
			primaryRgb: '52, 211, 153',
			secondaryRgb: '20, 184, 166',
			accentRgb: '34, 211, 238',
			bg: 'from-teal-900 via-emerald-900 to-black' 
		},
		{ 
			primary: '#fb7185', 
			secondary: '#f43f5e', 
			accent: '#fb923c',
			primaryRgb: '251, 113, 133',
			secondaryRgb: '244, 63, 94',
			accentRgb: '251, 146, 60',
			bg: 'from-pink-900 via-rose-900 to-black' 
		},
		{ 
			primary: '#facc15', 
			secondary: '#f59e0b', 
			accent: '#fb923c',
			primaryRgb: '250, 204, 21',
			secondaryRgb: '245, 158, 11',
			accentRgb: '251, 146, 60',
			bg: 'from-yellow-900 via-orange-900 to-black' 
		},
		{ 
			primary: '#a78bfa', 
			secondary: '#6366f1', 
			accent: '#3b82f6',
			primaryRgb: '167, 139, 250',
			secondaryRgb: '99, 102, 241',
			accentRgb: '59, 130, 246',
			bg: 'from-violet-900 via-indigo-900 to-black' 
		},
	];

	// Check if window exists (SSR safety)
	const getScreenWidth = () => {
		if (typeof window !== 'undefined') {
			return window.innerWidth;
		}
		return 1024; // Default to desktop size
	};

	// Reduce counts for better performance
	const shapes = useMemo(() => [
		{ id: 0, type: 'circle', size: 48, x: 15, y: 20, complexity: 'high', morphTarget: 'hexagon' },
		{ id: 1, type: 'square', size: 40, x: 75, y: 25, complexity: 'medium', morphTarget: 'circle' },
		{ id: 2, type: 'triangle', size: 56, x: 25, y: 70, complexity: 'high', morphTarget: 'diamond' },
		{ id: 3, type: 'hexagon', size: 32, x: 80, y: 75, complexity: 'low', morphTarget: 'octagon' },
		{ id: 4, type: 'diamond', size: 44, x: 50, y: 15, complexity: 'medium', morphTarget: 'square' },
	], []); // Only 5 shapes

	// Reduced particles for better mobile performance
	const particles = useMemo(() => {
		const screenWidth = getScreenWidth();
		return Array.from({ length: screenWidth < 768 ? 8 : 16 }).map((_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 2 + 1,
			speed: Math.random() * 1 + 0.5,
			direction: Math.random() * Math.PI * 2,
			energy: Math.random() * 100,
		}));
	}, []);

	// Responsive stars
	const stars = useMemo(() => {
		const screenWidth = getScreenWidth();
		return Array.from({ length: screenWidth < 768 ? 30 : 60 }).map((_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 1.2 + 0.3,
			twinkleDelay: Math.random() * 2,
			brightness: Math.random() * 0.7 + 0.3,
		}));
	}, []);

	// Reduced matrix columns for mobile
	const matrixColumns = useMemo(() => {
		const screenWidth = getScreenWidth();
		const columnCount = screenWidth < 768 ? 6 : 12;
		return Array.from({ length: columnCount }).map((_, i) => ({
			id: i,
			x: (i / columnCount) * 100,
			chars: Array.from({ length: 10 }).map(() => 
				String.fromCharCode(0x30A0 + Math.random() * 96)
			),
			speed: Math.random() * 1.2 + 0.8,
		}));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => {
				const newProgress = Math.min(prev + 0.6, 100);
				
				const phase = Math.floor((newProgress / 100) * (phases.length - 1));
				setCurrentPhase(phase);
				
				if (newProgress > 30) setShowConnections(true);
				
				if (newProgress === 100) {
					setTimeout(() => setIsComplete(true), 800);
				}
				return newProgress;
			});
		}, 60);

		return () => clearInterval(interval);
	}, [phases.length]);

	useEffect(() => {
		const colorInterval = setInterval(() => {
			setColorPhase(prev => (prev + 1) % colorSchemes.length);
		}, 3000);

		return () => clearInterval(colorInterval);
	}, [colorSchemes.length]);

	const currentColors = colorSchemes[colorPhase];

	// Fixed shape element function with static classes
	const getShapeElement = (shape: { type: string; size: number; morphTarget: string }, isMorphed = false) => {
		const currentType = isMorphed ? shape.morphTarget : shape.type;
		const baseStyle = {
			width: `${shape.size}px`,
			height: `${shape.size}px`,
			borderColor: currentColors.primary,
			backgroundColor: currentColors.primary + '20',
		};
		
		const shapeClasses = {
			circle: 'rounded-full border-2 backdrop-blur-sm',
			square: 'border-2 backdrop-blur-sm',
			triangle: 'border-2 backdrop-blur-sm transform rotate-45',
			hexagon: 'border-2 backdrop-blur-sm',
			diamond: 'border-2 backdrop-blur-sm transform rotate-45',
			octagon: 'border-2 backdrop-blur-sm',
		};

		return {
			className: shapeClasses[currentType as keyof typeof shapeClasses] || shapeClasses.circle,
			style: {
				...baseStyle,
				borderColor: isMorphed ? currentColors.accent : 
					currentType === 'square' || currentType === 'diamond' ? currentColors.secondary : currentColors.primary,
				backgroundColor: (isMorphed ? currentColors.accent : 
					currentType === 'square' || currentType === 'diamond' ? currentColors.secondary : currentColors.primary) + '20',
			}
		};
	};

	// Optimized animations with reduced complexity for mobile
	const getAnimationComplexity = (complexity: string, index: number) => {
		const isMobile = getScreenWidth() < 768;
		const base = {
			duration: isMobile ? 6 + index * 0.3 : 4 + index * 0.5,
			repeat: Infinity,
			ease: "easeInOut" as const,
			delay: index * 0.3,
		};

		if (isMobile) {
			// Simplified animations for mobile
			return {
				...base,
				y: [-15, 15, -15],
				rotate: [0, 180, 360],
				scale: [1, 1.2, 1],
			};
		}

		const complexityMap = {
			high: {
				...base,
				duration: base.duration + 2,
				y: [-30, 30, -30],
				x: [-10, 10, -10],
				rotate: [0, 360, 720],
				scale: [1, 1.6, 0.6, 1.4, 1],
			},
			medium: {
				...base,
				y: [-20, 20, -20],
				rotate: [0, 180, 360],
				scale: [1, 1.3, 0.8, 1],
			},
			low: {
				...base,
				y: [-10, 10, -10],
				rotate: [0, 90, 180],
				scale: [1, 1.15, 1],
			}
		};

		return complexityMap[complexity as keyof typeof complexityMap] || complexityMap.low;
	};

	return (
		<motion.div
			className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br ${currentColors.bg} z-[100] overflow-hidden`}
			style={{ willChange: 'opacity, transform, filter' }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
			transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
			role="dialog"
			aria-label="Loading screen"
			aria-live="polite"
		>
			{/* Galaxy stars background */}
			<div className="absolute inset-0 overflow-hidden">
				{stars.map((star) => (
					<motion.div
						key={star.id}
						className="absolute rounded-full bg-white"
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: star.size,
							height: star.size,
							willChange: 'opacity, transform',
						}}
						animate={{
							opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 1.2 + star.twinkleDelay,
							repeat: Infinity,
							delay: star.twinkleDelay,
						}}
					/>
				))}
			</div>

			{/* Matrix digital rain background - hidden on mobile for performance */}
			<div className="absolute inset-0 overflow-hidden opacity-10 hidden sm:block">
				{matrixColumns.map((column) => (
					<motion.div
						key={column.id}
						className="absolute top-0 text-green-400 text-xs font-mono"
						style={{ left: `${column.x}%`, willChange: 'transform' }}
						animate={{ y: ['-100vh', '100vh'] }}
						transition={{
							duration: 6 / column.speed,
							repeat: Infinity,
							ease: 'linear',
						}}
					>
						{column.chars.map((char, i) => (
							<motion.div
								key={i}
								animate={{
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 0.3,
									delay: i * 0.07,
									repeat: Infinity,
								}}
							>
								{char}
							</motion.div>
						))}
					</motion.div>
				))}
			</div>

			{/* Enhanced floating geometric shapes with morphing */}
			<div className="absolute inset-0 overflow-hidden">
				{shapes.map((shape, i) => {
					const animation = getAnimationComplexity(shape.complexity, i);
					const shapeProps = getShapeElement(shape);
					return (
						<motion.div
							key={shape.id}
							className="absolute transform-gpu"
							style={{
								left: `${shape.x}%`,
								top: `${shape.y}%`,
								willChange: 'transform, opacity',
							}}
							animate={animation}
							transition={animation}
						>
							{/* Original shape */}
							<motion.div
								className={shapeProps.className}
								style={shapeProps.style}
								animate={{
									boxShadow: [
										`0 0 12px rgba(${currentColors.primaryRgb}, 0.5)`,
										`0 0 24px rgba(${currentColors.primaryRgb}, 0.6), 0 0 36px rgba(${currentColors.accentRgb}, 0.2)`,
										`0 0 12px rgba(${currentColors.primaryRgb}, 0.5)`,
									],
									opacity: [1, 0.7, 1],
								}}
								transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
							/>
							
							{/* Morphing overlay - hidden on mobile */}
							<motion.div
								className={`absolute inset-0 hidden md:block ${getShapeElement(shape, true).className}`}
								style={getShapeElement(shape, true).style}
								animate={{
									opacity: [0, 0.5, 0],
									scale: [0.9, 1.1, 0.9],
								}}
								transition={{
									duration: 2.5,
									repeat: Infinity,
									delay: i * 0.2 + 1.2,
								}}
							/>

							{/* Energy ring - simplified for mobile */}
							<motion.div
								className="absolute inset-0 border-2 border-white rounded-full opacity-20 hidden sm:block"
								animate={{
									scale: [1, 1.5, 1],
									opacity: [0.2, 0, 0.2],
									rotate: [0, 360],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									delay: i * 0.25,
								}}
							/>
						</motion.div>
					);
				})}
			</div>

			{/* Enhanced particle system with energy trails */}
			<AnimatePresence>
				{showConnections && (
					<motion.div
						className="absolute inset-0 pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{/* Energy streams between shapes - simplified for mobile */}
						<svg className="w-full h-full hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
							{shapes.slice(0, 6).map((shape, i) => {
								const nextShape = shapes[(i + 1) % 6];
								return (
									<g key={`energy-${i}`}>
										{/* Main energy line */}
										<motion.line
											x1={shape.x}
											y1={shape.y}
											x2={nextShape.x}
											y2={nextShape.y}
											stroke={currentColors.primary}
											strokeWidth="0.2"
											className="opacity-60"
											initial={{ pathLength: 0 }}
											animate={{ pathLength: [0, 1, 0] }}
											transition={{
												duration: 2,
												delay: i * 0.3,
												repeat: Infinity,
											}}
										/>
									</g>
								);
							})}
						</svg>

						{/* Enhanced floating particles with trails */}
						{particles.map((particle) => (
							<motion.div
								key={particle.id}
								className="absolute rounded-full"
								style={{
									width: particle.size,
									height: particle.size,
									left: `${particle.x}%`,
									top: `${particle.y}%`,
									backgroundColor: currentColors.primary,
								}}
								animate={{
									x: [
										Math.cos(particle.direction) * 70,
										Math.cos(particle.direction + Math.PI) * 70,
									],
									y: [
										Math.sin(particle.direction) * 70,
										Math.sin(particle.direction + Math.PI) * 70,
									],
									opacity: [0.8, 0.3, 0.8],
									scale: [1, 1.5, 1],
								}}
								transition={{
									duration: 5 / particle.speed,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main content with responsive design */}
			<div className="text-center z-10 px-4 sm:px-6 relative transform-gpu w-full max-w-4xl mx-auto">
				{/* Responsive name with glitch effects */}
				<motion.h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white relative">
					{name.split('').map((char, i) => (
						<motion.span
							key={i}
							className="inline-block relative"
							initial={{ opacity: 0, y: 100 }}
							animate={{ 
								opacity: 1, 
								y: 0,
								textShadow: [
									'0 0 0px rgba(255,255,255,0)',
									`0 0 20px rgba(${currentColors.primaryRgb}, 1), 0 0 40px rgba(${currentColors.accentRgb}, 0.8)`,
									'0 0 0px rgba(255,255,255,0)',
								],
							}}
							transition={{ 
								delay: i * 0.08, 
								duration: 0.8,
								type: "spring",
								stiffness: 100,
								textShadow: { duration: 3, repeat: Infinity, delay: i * 0.1 },
							}}
						>
							{char === ' ' ? '\u00A0' : char}
						</motion.span>
					))}
				</motion.h1>

				{/* Responsive title with scanning effect */}
				<motion.p
					className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 relative overflow-hidden"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1.5, duration: 0.6 }}
				>
					{title}
					<motion.div
						className="absolute top-0 left-0 w-full h-full opacity-30 hidden sm:block"
						style={{
							background: `linear-gradient(to right, transparent, ${currentColors.primary}, transparent)`,
						}}
						animate={{ x: ['-100%', '100%'] }}
						transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
					/>
				</motion.p>

				{/* Responsive progress section */}
				<div className="space-y-4">
					{/* Enhanced phase indicator */}
					<motion.div
						className="text-xs sm:text-sm mb-4 relative"
						style={{ color: currentColors.primary }}
						key={currentPhase}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
					>
						<motion.span
							animate={{
								textShadow: [
									`0 0 5px rgba(${currentColors.primaryRgb}, 0.8)`,
									`0 0 15px rgba(${currentColors.primaryRgb}, 1), 0 0 25px rgba(${currentColors.secondaryRgb}, 0.6)`,
									`0 0 5px rgba(${currentColors.primaryRgb}, 0.8)`,
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						>
							{phases[currentPhase]}
						</motion.span>
						
						{/* Scanning line */}
						<motion.div
							className="absolute -bottom-1 left-0 h-0.5"
							style={{
								background: `linear-gradient(to right, transparent, ${currentColors.primary}, transparent)`,
							}}
							animate={{ width: ['0%', '100%', '0%'] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
					</motion.div>

					{/* Responsive progress bar */}
					<div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
						<div className="h-2 sm:h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-600 relative">
							{/* Energy flow background */}
							<motion.div
								className="absolute inset-0 opacity-20"
								style={{
									background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary}, ${currentColors.accent})`,
								}}
								animate={{ x: ['-100%', '100%'] }}
								transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
							/>
							
							{/* Main progress bar */}
							<motion.div
								className="h-full rounded-full relative overflow-hidden"
								style={{
									background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary}, ${currentColors.accent})`,
								}}
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							>
								{/* Inner glow */}
								<motion.div
									className="absolute inset-0 opacity-30"
									style={{
										background: 'linear-gradient(to right, white, rgba(255,255,255,0.5), white)',
									}}
									animate={{ x: ['-100%', '100%'] }}
									transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
								/>
							</motion.div>
							
							{/* Quantum scanning effect */}
							<motion.div
								className="absolute top-0 w-0.5 sm:w-1 h-full bg-white opacity-90 rounded-full"
								style={{ left: `${Math.max(progress - 1, 0)}%` }}
								animate={{
									boxShadow: [
										'0 0 10px rgba(255,255,255,1)',
										`0 0 30px rgba(${currentColors.secondaryRgb},1)`,
										'0 0 10px rgba(255,255,255,1)',
									],
								}}
								transition={{ duration: 1, repeat: Infinity }}
							/>
						</div>

						{/* Responsive progress segments */}
						<div className="flex justify-between mt-2 sm:mt-3">
							{phases.slice(0, -1).map((_, i) => (
								<motion.div
									key={i}
									className="relative"
								>
									<motion.div
										className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 ${
											i <= currentPhase 
												? 'border-current' 
												: 'bg-slate-700 border-slate-600'
										}`}
										style={{
											backgroundColor: i <= currentPhase ? currentColors.primary : undefined,
											borderColor: i <= currentPhase ? currentColors.primary : undefined,
										}}
										animate={{
											scale: i === currentPhase ? [1, 1.4, 1] : 1,
											boxShadow: i === currentPhase ? [
												'0 0 0px rgba(255,255,255,0)',
												`0 0 20px rgba(${currentColors.primaryRgb},1)`,
												'0 0 0px rgba(255,255,255,0)',
											] : 'none',
										}}
										transition={{ 
											duration: 1, 
											repeat: i === currentPhase ? Infinity : 0 
										}}
									/>
								</motion.div>
							))}
						</div>
					</div>

					{/* Responsive progress percentage */}
					<motion.div
						className="text-2xl sm:text-3xl md:text-4xl font-mono relative"
						style={{ color: currentColors.primary }}
						animate={{ 
							scale: [1, 1.05, 1],
							textShadow: [
								`0 0 10px rgba(${currentColors.primaryRgb}, 0.8)`,
								`0 0 30px rgba(${currentColors.primaryRgb}, 1), 0 0 50px rgba(${currentColors.secondaryRgb}, 0.6)`,
								`0 0 10px rgba(${currentColors.primaryRgb}, 0.8)`,
							],
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						{Math.round(progress)}%
						
						{/* Digital frame - hidden on mobile */}
						<motion.div
							className="absolute -inset-2 sm:-inset-4 border opacity-30 hidden sm:block"
							style={{
								borderColor: currentColors.primary,
								clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
							}}
							animate={{ 
								borderColor: [
									currentColors.primary,
									currentColors.secondary,
									currentColors.accent,
									currentColors.primary,
								],
							}}
							transition={{ duration: 3, repeat: Infinity }}
						/>
					</motion.div>
				</div>

				{/* Enhanced completion message with responsive design */}
				<AnimatePresence>
					{isComplete && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1.5 }}
							transition={{ duration: 1, type: "spring", stiffness: 100 }}
						>
							<div className="text-center relative px-4">
								{/* Portal effect - responsive */}
								<motion.div
									className="absolute -inset-10 sm:-inset-20 rounded-full border-2 sm:border-4 opacity-30"
									style={{ borderColor: currentColors.primary }}
									animate={{ 
										scale: [0, 3],
										opacity: [0.6, 0],
										borderWidth: [4, 0],
									}}
									transition={{ duration: 2, repeat: Infinity }}
								/>
								
								<motion.div
									className="text-4xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 relative"
									animate={{ 
										rotate: [0, 360],
										scale: [1, 1.3, 1],
									}}
									transition={{ 
										duration: 4, 
										repeat: Infinity, 
										ease: "easeInOut" 
									}}
								>
									🌌
									<motion.div
										className="absolute inset-0 text-4xl sm:text-6xl md:text-8xl"
										animate={{ 
											rotate: [0, -360],
											opacity: [0.7, 0.3, 0.7],
										}}
										transition={{ 
											duration: 3, 
											repeat: Infinity 
										}}
									>
										✨
									</motion.div>
								</motion.div>
								
								<motion.p 
									className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4"
									style={{ color: currentColors.primary }}
									animate={{
										textShadow: [
											`0 0 10px rgba(${currentColors.primaryRgb},0.5)`,
											`0 0 30px rgba(${currentColors.primaryRgb},1), 0 0 50px rgba(${currentColors.secondaryRgb},0.8)`,
											`0 0 10px rgba(${currentColors.primaryRgb},0.5)`,
										],
									}}
									transition={{ duration: 2, repeat: Infinity }}
								>
									🚀 Portal Activated!
								</motion.p>
								
								<motion.p 
									className="text-slate-300 text-sm sm:text-base md:text-lg"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
								>
									Welcome to the quantum realm of possibilities
								</motion.p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Enhanced ambient effects */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				animate={{
					background: [
						`radial-gradient(circle at 20% 30%, rgba(${currentColors.primaryRgb},0.1) 0%, transparent 50%)`,
						`radial-gradient(circle at 80% 70%, rgba(${currentColors.secondaryRgb},0.1) 0%, transparent 50%)`,
						`radial-gradient(circle at 50% 50%, rgba(${currentColors.accentRgb},0.1) 0%, transparent 50%)`,
						`radial-gradient(circle at 20% 30%, rgba(${currentColors.primaryRgb},0.1) 0%, transparent 50%)`,
					],
				}}
				transition={{ duration: 12, repeat: Infinity }}
			/>

			{/* Quantum grid overlay - hidden on mobile */}
			<div className="absolute inset-0 opacity-5 hidden md:block">
				<div 
					className="w-full h-full bg-repeat"
					style={{
						backgroundImage: `
							linear-gradient(rgba(${currentColors.primaryRgb},0.3) 1px, transparent 1px),
							linear-gradient(90deg, rgba(${currentColors.primaryRgb},0.3) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px',
					}}
				/>
			</div>
		</motion.div>
	);
};

export default GeometricLoadingScreen;
