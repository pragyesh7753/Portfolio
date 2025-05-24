import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Code2, Rocket, Sparkles, Terminal, Coffee } from 'lucide-react';

// Creative: Orbiting planets and animated rocket launch loading screen

const planets = [
	{ color: 'bg-blue-400', size: 16, orbit: 80, duration: 7, delay: 0 },
	{ color: 'bg-violet-400', size: 10, orbit: 110, duration: 10, delay: 1 },
	{ color: 'bg-pink-400', size: 7, orbit: 140, duration: 13, delay: 2 },
	{ color: 'bg-amber-400', size: 5, orbit: 170, duration: 16, delay: 3 },
];

const LoadingScreen = () => {
	const [progress, setProgress] = useState(0);
	const [rocketLaunched, setRocketLaunched] = useState(false);
	const [showStars, setShowStars] = useState(false);

	const fullName = 'Pragyesh Kumar Seth';
	const title = 'Full Stack Developer';
	const loadingPhases = [
		{ icon: Terminal, text: 'Initializing workspace...' },
		{ icon: Code2, text: 'Loading components...' },
		{ icon: Coffee, text: 'Brewing perfect code...' },
		{ icon: Rocket, text: 'Preparing for launch...' },
		{ icon: Sparkles, text: 'Almost ready!' },
	];

	// Progress and rocket launch
	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((p) => {
				const newProgress = Math.min(p + 1.5, 100);
				if (newProgress >= 100) {
					clearInterval(interval);
					setTimeout(() => setRocketLaunched(true), 600);
					setTimeout(() => setShowStars(true), 1200);
				}
				return newProgress;
			});
		}, 40);

		return () => clearInterval(interval);
	}, []);

	// Determine current loading phase based on progress
	const currentPhase = Math.min(
		Math.floor((progress / 100) * loadingPhases.length),
		loadingPhases.length - 1
	);

	// Animated stars after rocket launch
	const stars = Array.from({ length: 40 }).map(() => ({
		left: Math.random() * 100,
		top: Math.random() * 100,
		size: 1 + Math.random() * 2,
		delay: Math.random() * 1.5,
	}));

	return (
		<motion.div
			className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1026] via-[#1a1e2e] to-[#23243a] z-[100] overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.8,
					ease: [0.2, 0.65, 0.3, 0.9],
				},
			}}
		>
			{/* Animated stars after rocket launch */}
			<AnimatePresence>
				{showStars && (
					<motion.div
						className="absolute inset-0 pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{stars.map((star, i) => (
							<motion.div
								key={i}
								className="absolute rounded-full bg-white"
								style={{
									left: `${star.left}%`,
									top: `${star.top}%`,
									width: `${star.size}px`,
									height: `${star.size}px`,
									opacity: 0.7 + Math.random() * 0.3,
								}}
								initial={{ scale: 0 }}
								animate={{ scale: [0, 1, 0.8, 1] }}
								transition={{
									delay: star.delay,
									duration: 2.5 + Math.random(),
									repeat: Infinity,
									repeatType: 'reverse',
									ease: 'easeInOut',
								}}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Orbiting planets */}
			<div className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]">
				{/* Orbits */}
				{planets.map((planet, i) => (
					<motion.div
						key={i}
						className="absolute left-1/2 top-1/2"
						style={{
							width: `${planet.orbit * 2}px`,
							height: `${planet.orbit * 2}px`,
							marginLeft: `-${planet.orbit}px`,
							marginTop: `-${planet.orbit}px`,
							borderRadius: '50%',
							border: '1px dashed rgba(255,255,255,0.08)',
						}}
					>
						<motion.div
							className={cn(
								'absolute',
								planet.color,
								'rounded-full shadow-lg'
							)}
							style={{
								width: `${planet.size}px`,
								height: `${planet.size}px`,
								left: `${planet.orbit - planet.size / 2}px`,
								top: `${planet.orbit - planet.size / 2}px`,
							}}
							animate={{
								rotate: [0, 360],
							}}
							transition={{
								repeat: Infinity,
								duration: planet.duration,
								ease: 'linear',
								delay: planet.delay,
							}}
						/>
					</motion.div>
				))}

				{/* Rocket */}
				<motion.div
					className="absolute left-1/2 top-1/2 z-10"
					style={{
						marginLeft: '-32px',
						marginTop: '-32px',
						width: '64px',
						height: '64px',
					}}
					initial={false}
					animate={
						rocketLaunched
							? {
									y: -320,
									scale: 0.7,
									opacity: 0,
									rotate: -10,
									transition: { duration: 1.2, ease: 'easeIn' },
							  }
							: {
									y: 0,
									scale: 1,
									opacity: 1,
									rotate: 0,
									transition: { type: 'spring', stiffness: 120, damping: 10 },
							  }
					}
				>
					<motion.div
						className="flex flex-col items-center"
						animate={
							rocketLaunched
								? { y: [0, -30, -60, -120], opacity: [1, 1, 0.8, 0] }
								: { y: 0, opacity: 1 }
						}
						transition={{ duration: 1.2, ease: 'easeIn' }}
					>
						<Rocket className="w-16 h-16 text-white drop-shadow-lg" />
						{/* Rocket flame */}
						{!rocketLaunched && (
							<motion.div
								className="w-4 h-8 rounded-full bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-500 blur-sm mt-[-8px]"
								animate={{
									scaleY: [1, 1.3, 1],
									opacity: [0.7, 1, 0.7],
								}}
								transition={{
									repeat: Infinity,
									duration: 0.5,
									ease: 'easeInOut',
								}}
							/>
						)}
					</motion.div>
				</motion.div>
			</div>

			{/* Name and title */}
			<motion.div
				className="flex flex-col items-center mt-10"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
			>
				<motion.h1
					className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tighter text-white"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">
						{fullName}
					</span>
				</motion.h1>
				<motion.p
					className="text-lg text-white/70 tracking-wide mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1 }}
				>
					{title}
				</motion.p>
			</motion.div>

			{/* Progress bar and loading phase */}
			<div className="w-64 sm:w-80 mt-6">
				<div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
					<motion.div
						className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 via-violet-500 to-pink-400 rounded-full"
						initial={{ width: "0%" }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					/>
				</div>
				<motion.div
					className="flex items-center gap-2 text-sm text-white/80 mt-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					{loadingPhases[currentPhase] && loadingPhases[currentPhase].icon && (
						<span className="flex items-center">
							{React.createElement(loadingPhases[currentPhase].icon, { className: "w-4 h-4 mr-1" })}
						</span>
					)}
					<span>{loadingPhases[currentPhase]?.text}</span>
					<span className="ml-auto">{Math.round(progress)}%</span>
				</motion.div>
			</div>

			{/* Animated "Launching..." text after rocket launch */}
			<AnimatePresence>
				{rocketLaunched && (
					<motion.div
						className="absolute bottom-16 left-0 right-0 flex justify-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 30 }}
						transition={{ duration: 0.7 }}
					>
						<motion.span
							className="text-xl font-semibold text-white bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent"
							animate={{ opacity: [1, 0.5, 1] }}
							transition={{ duration: 1.2, repeat: Infinity }}
						>
							Launching...
						</motion.span>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default LoadingScreen;
