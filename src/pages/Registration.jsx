import RegistrationForm from '../components/Registration/RegistrationForm';

export default function Registration() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background-900 relative">
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none"></div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 glow-text uppercase tracking-wider">
            Registration Protocol
          </h1>
          <p className="text-metal-400 max-w-2xl mx-auto">
            Initiate the process to join Hack the Doom. Ensure all team members have their details ready before proceeding.
          </p>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}
