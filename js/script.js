const menu=document.querySelector(".hamb"),links=document.querySelector(".links");if(menu)menu.addEventListener("click",()=>links.classList.toggle("open"));
document.querySelectorAll(".links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
const counters=document.querySelectorAll("[data-count]");const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let el=e.target,n=0,t=+el.dataset.count,s=Math.max(1,Math.ceil(t/45));let x=setInterval(()=>{n+=s;if(n>=t){n=t;clearInterval(x)}el.textContent=n},25);obs.unobserve(el)}}),{threshold:.6});counters.forEach(c=>obs.observe(c));
const form=document.getElementById("contactForm");if(form)form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent("New Cosyclick enquiry - "+d.get("name"));const body=encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nCompany: ${d.get("company")}\nService: ${d.get("service")}\nGoal: ${d.get("message")}`);window.location.href=`mailto:hello@cosyclick.com?subject=${subject}&body=${body}`;document.getElementById("formNote").textContent="Your email app should open with the enquiry pre-filled.";});
const statsSection = document.querySelector(".stats");

if (statsSection) {
  const counters = statsSection.querySelectorAll("[data-count]");
  let started = false;

  const startCounters = () => {
    if (started) return;
    started = true;

    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || "";

      let current = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target + suffix;
          return;
        }

        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    },
    {
      threshold: 0.3
    }
  );

  observer.observe(statsSection);
}