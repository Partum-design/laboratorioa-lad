import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de privacidad — LAD Metepec",
  description: "Aviso de privacidad integral para pacientes de LAD Metepec.",
};

const EMAIL = "ladmetepec2026@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-display text-lg font-bold text-lad-red">{title}</h3>
      <div className="space-y-3 text-[15px] leading-relaxed text-gray-700">{children}</div>
    </section>
  );
}

const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="font-semibold text-lad-red underline-offset-2 hover:underline">
    {EMAIL}
  </a>
);

export default function AvisoPrivacidadMetepec() {
  return (
    <div className="bg-lad-gray-light pb-20 pt-32">
      <div className="container-lad">
        <article className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10">
          <header className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">LAD / Sucursal Metepec</p>
            <h1 className="heading-lg">Aviso de privacidad integral para pacientes</h1>
          </header>

          <Section title="Quién es responsable de sus datos">
            <p>
              Laboratorio de Análisis Clínicos Tenancingo, S.A. de C.V., que opera como LAD Metepec, con domicilio en Av.
              Benito Juárez García núm. 514 Norte, Barrio de San Mateo, C.P. 52140, Metepec, Estado de México.
            </p>
          </Section>

          <Section title="Qué datos recabamos">
            <p>
              Tratamos los datos de identificación y contacto necesarios para registrar su atención y entregar sus
              resultados, así como folios, datos de pago y, si solicita factura, datos fiscales. Su receta u orden médica
              puede incluir estudios solicitados, diagnóstico y antecedentes clínicos. También tratamos los datos que se
              generan al realizar los estudios, incluidas imágenes, mediciones e informes cuando corresponda. El
              diagnóstico, los antecedentes, los estudios y sus resultados son datos personales sensibles de salud. Las
              cámaras de recepción y sala de espera captan imágenes de las personas que ingresan.
            </p>
          </Section>

          <Section title="Para qué usamos sus datos">
            <p>
              Utilizamos sus datos para identificarle, registrar su orden, realizar o gestionar los estudios de
              laboratorio e imagen, emitir y entregar sus resultados por el canal que usted indique, gestionar el cobro y
              la facturación y cumplir obligaciones aplicables. Usamos las imágenes de videovigilancia para la seguridad
              de pacientes, visitantes, personal e instalaciones y para atender incidentes.
            </p>
          </Section>

          <Section title="Cómo puede recibir sus resultados">
            <p>
              Usted puede elegir la entrega presencial con su recibo, el envío al número de WhatsApp o correo electrónico
              que indique, o la consulta en el portal de resultados mediante contraseña. Si desea que un familiar u otra
              persona los recoja, autorícela ante recepción. La persona autorizada deberá acreditar su identidad conforme
              al procedimiento de entrega. El recibo permite localizar el estudio.
            </p>
          </Section>

          <Section title="Cuándo comunicamos datos a otras organizaciones">
            <p>
              Según el estudio solicitado, podemos comunicar los datos indispensables a PGM Labs para estudios
              histopatológicos o a Laboratorio Ortín para el procesamiento de estudios especializados. Cuando estos
              laboratorios actúen por cuenta e instrucciones de LAD, tratarán los datos para prestar el servicio
              encomendado. Cuando la comunicación constituya una transferencia, se aplicarán los artículos 35 y 36 de la
              Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Si la transferencia requiere
              su consentimiento, se solicitará su autorización expresa antes de realizarla. También podemos comunicar
              datos a autoridades competentes cuando exista una obligación legal.
            </p>
          </Section>

          <h2 className="border-t border-gray-200 pt-10 font-display text-2xl font-bold text-lad-black">
            Sus derechos y opciones de privacidad
          </h2>

          <Section title="Cómo ejercer sus derechos ARCO">
            <p>
              Puede solicitar acceso a sus datos personales, rectificar información inexacta o incompleta, solicitar su
              cancelación u oponerse a su tratamiento en los casos previstos por la ley. Dirija su solicitud a la persona o
              área designada para proteger los datos personales en LAD Metepec. Envíela a <Mail /> o preséntela por
              escrito en recepción, en el domicilio indicado en este aviso.
            </p>
            <p>
              Incluya su nombre, un domicilio o medio para recibir respuesta, los documentos que acrediten su identidad y,
              si actúa mediante representante, la identidad y facultades de esa persona, el derecho que desea ejercer, una
              descripción clara de los datos correspondientes cuando proceda y cualquier elemento que facilite
              localizarlos, como el folio del estudio. Para rectificación, indique el cambio solicitado y adjunte el
              sustento correspondiente.
            </p>
            <p>
              Le comunicaremos la determinación en un plazo máximo de 20 días hábiles a partir de la recepción de la
              solicitud. Si procede, la haremos efectiva dentro de los 15 días hábiles siguientes a la comunicación. Los
              plazos podrán ampliarse una sola vez por un periodo igual, cuando esté justificado.
            </p>
          </Section>

          <Section title="Cómo limitar el uso o revocar su consentimiento">
            <p>
              Escriba a <Mail /> o presente su solicitud en recepción. Indique qué uso o divulgación desea limitar o qué
              consentimiento desea revocar, y el medio para recibir respuesta. También puede pedir que se cambie el canal
              de entrega de sus resultados, sujeto al estado de la entrega. La revocación surte efectos hacia adelante y
              está sujeta a las obligaciones legales aplicables.
            </p>
          </Section>

          <Section title="Consentimiento para datos sensibles">
            <p>
              Cuando la ley exige el consentimiento para tratar datos sensibles de salud, lo recabamos de manera expresa y
              por escrito, mediante firma u otro mecanismo de autenticación aplicable.
            </p>
          </Section>

          <Section title="Dónde consultar este aviso y sus cambios">
            <p>
              Puede consultar este aviso integral y sus actualizaciones en la recepción de LAD Metepec y en esta página
              del sitio web de LAD. Publicaremos la versión actualizada por esos medios e indicaremos la fecha de
              actualización.
            </p>
          </Section>

          <div className="border-t border-gray-200 pt-8">
            <Link href="/contacto#sucursales" className="btn-primary">
              Volver a sucursales
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
