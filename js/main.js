document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const btn = document.querySelector('.hamburguesa'), menu = document.querySelector('.menu');
  btn.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', abierto);
  });

  // Marcar página activa
  const actual = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === actual) a.classList.add('activo');
  });

  // Botón subir
  const subir = document.querySelector('.subir');
  window.addEventListener('scroll', () => subir.classList.toggle('visible', scrollY > 400));
  subir.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Aparición al hacer scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Formulario -> WhatsApp
  const form = document.getElementById('form-contacto');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hola Hemcor, soy ${d.get('nombre')}.\nTipo de proyecto: ${d.get('tipo')}\nCorreo: ${d.get('correo')}\n${d.get('mensaje')}`;
    window.open('https://wa.me/50671108270?text=' + encodeURIComponent(msg), '_blank');
    form.querySelector('.aviso').textContent = 'Abriendo WhatsApp con tu mensaje…';
  });
});
