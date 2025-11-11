import PrismaticBurst from "@/components/PrismaticBurst";

const PrismaticPreview = () => {
	return (
		<div className="w-screen h-screen fixed inset-0">
			<PrismaticBurst
				animationType="rotate3d"
				intensity={1.3}
				speed={3}
				distort={10}
				paused={false}
				offset={{ x: 0, y: 0 }}
				hoverDampness={0.64}
				rayCount={0}
				mixBlendMode="lighten"
				colors={["#8a8b9e", "#5e4469", "#7d8b78"]}
			/>
		</div>
	);
};

export default PrismaticPreview;


