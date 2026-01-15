// src/app/(guest)/invitacion/[uuid]/layout.jsx

export default function InvitationLayout({ children }) {
    return (
        // Esto activa todas las variables CSS que definimos en globals.css
        <div className="min-h-screen w-full invitation-scope">
            {children}
        </div>
    );
}