export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-golden/30 border-t-golden rounded-full animate-spin"></div>
                <p className="text-primary font-bold tracking-widest text-sm animate-pulse">LOADING</p>
            </div>
        </div>
    );
}
