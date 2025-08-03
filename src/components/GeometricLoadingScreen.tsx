import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GeometricLoadingScreen = () => {
	const [progress, setProgress] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => {
				const newProgress = Math.min(prev + 1.2, 100);
				if (newProgress === 100) setTimeout(() => setIsComplete(true), 300);
				return newProgress;
			});
		}, 40);
		return () => clearInterval(interval);
	}, []);

	if (isComplete) return null;

	return (
		<motion.div
			className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Animated Grid */}
			<div className="absolute inset-0 opacity-10">
				<div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" 
					style={{
						backgroundImage: `
							linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: '60px 60px'
					}}
				/>
			</div>

			{/* Main Content */}
			<div className="text-center z-10">
				{/* Logo/Icon */}
				<motion.div
					className="w-20 h-20 mx-auto mb-8 relative"
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
				>
					<div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent" />
					<motion.div
						className="absolute inset-2 border-2 border-purple-500 rounded-full border-b-transparent"
						animate={{ rotate: -360 }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
					/>
					<div className="absolute inset-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
				</motion.div>

				{/* Name */}
				<motion.h1
					className="text-4xl font-bold text-white mb-2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					Pragyesh Kumar Seth
				</motion.h1>

				{/* Title */}
				<motion.p
					className="text-gray-400 mb-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					Full Stack Developer
				</motion.p>

				{/* Progress Bar */}
				<div className="w-80 mx-auto">
					<div className="flex justify-between text-sm text-gray-500 mb-2">
						<span>Loading</span>
						<span>{Math.round(progress)}%</span>
					</div>
					<div className="h-1 bg-gray-800 rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.1 }}
						/>
					</div>
				</div>

				{/* Dots */}
				<motion.div
					className="flex justify-center space-x-2 mt-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
				>
					{[0, 1, 2].map(i => (
						<motion.div
							key={i}
							className="w-2 h-2 bg-blue-500 rounded-full"
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 1, 0.5]
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: i * 0.2
							}}
						/>
					))}
				</motion.div>
			</div>

			{/* Floating Particles */}
			{Array.from({ length: 6 }).map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
					style={{
						left: `${20 + i * 12}%`,
						top: `${30 + (i % 2) * 40}%`
					}}
					animate={{
						y: [-20, 20, -20],
						opacity: [0.3, 0.8, 0.3]
					}}
					transition={{
						duration: 3 + i * 0.5,
						repeat: Infinity,
						delay: i * 0.3
					}}
				/>
			))}
		</motion.div>
	);
};

export default GeometricLoadingScreen;