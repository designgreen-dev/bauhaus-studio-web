import Logo from '@/components/atoms/Logo'
import NotifyForm from '@/components/molecules/NotifyForm'

export default function Hero() {
  return (
    <section className="flex flex-col justify-center px-6 py-24 md:px-16 lg:px-28 xl:px-36">
      <Logo />

      <div className="mt-16 space-y-5 max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-dark leading-[1.1]">
          Estamos diseñando<br />
          algo increíble.
        </h1>
        <p className="text-sm font-light text-warm-gray leading-relaxed tracking-wide max-w-xs">
          Arquitectura bioclimática en el corazón de los Andes.
          <br />
          Huaraz, Perú.
        </p>
      </div>

      <div className="mt-16 space-y-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray">
          Sé el primero en enterarte
        </p>
        <NotifyForm />
      </div>
    </section>
  )
}
