export default function InvitationLayout({ children, }) {
    return (
        // Agregamos min-h-screen para asegurar que ocupe toda la altura
        <div className="min-h-screen w-full">
            {children}
        </div>
    );
}