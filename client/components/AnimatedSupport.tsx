import { useEffect, useState } from "react";

export default function AnimatedSupport() {
  const [isVisible, setIsVisible] = useState(false);

  const supportTeam = [
    {
      name: "Chihiro",
      country: "Japan",
      image:
        "https://images.ctfassets.net/23u853certza/1AeBRW9VBPdxDSs8uruqj6/0c70c664720bb4c488d5f1591a9f2cb5/support-associate-22.png",
      scale: 0.256849,
      top: 48.518,
      left: 165,
      duration: 93.8079,
      delay: 0,
    },
    {
      name: "Yasin",
      country: "Sweden",
      image:
        "https://images.ctfassets.net/23u853certza/6ny1xxdG2ohuZu4eJfssiu/0aae836ac19638b50b637ddd0065c205/support-associate-19.png",
      scale: 0.28011,
      top: 52.7472,
      left: 165,
      duration: 85.0387,
      delay: -5.66925,
    },
    {
      name: "Tsuyoshi",
      country: "Japan",
      image:
        "https://images.ctfassets.net/23u853certza/5In7PJ4GoXpEnAqJEPiDr2/51c96420a988107c588d8295b3733620/support-associate-21.png",
      scale: 0.37595,
      top: 70.1728,
      left: 165,
      duration: 48.9067,
      delay: -6.52089,
    },
    {
      name: "Mari",
      country: "Japan",
      image:
        "https://images.ctfassets.net/23u853certza/416XhJwhKAkfw93T3BWfsj/65c44bba77855f6f6835c50795043a17/support-associate-20.png",
      scale: 0.313325,
      top: 58.7864,
      left: 165,
      duration: 72.5164,
      delay: -14.5033,
    },
    {
      name: "Zuzana",
      country: "Slovakia",
      image:
        "https://images.ctfassets.net/23u853certza/OMmgO898m8egt2oHBHrRj/f99fd3223277820190d1758e53de1880/support-associate-18.png",
      scale: 0.349533,
      top: 65.3696,
      left: 165,
      duration: 58.8661,
      delay: -15.6976,
    },
    {
      name: "Ali",
      country: "Azerbaijan",
      image:
        "https://images.ctfassets.net/23u853certza/5OEI3QZRMdWymooQMoxZ9Q/f169ae8186523a06666aee6389ba27b5/support-associate-17.png",
      scale: 0.366174,
      top: 68.3952,
      left: 165,
      duration: 52.5926,
      delay: -17.5309,
    },
    {
      name: "Ida",
      country: "Finland",
      image:
        "https://images.ctfassets.net/23u853certza/6iExBRlJ69CLTD9RnS8MIZ/7710d01b7fe43fcdd53ca5e772ef7ad8/support-associate-16.png",
      scale: 0.280908,
      top: 52.8924,
      left: 165,
      duration: 84.7376,
      delay: -33.895,
    },
    {
      name: "Marjena",
      country: "Slovakia",
      image:
        "https://images.ctfassets.net/23u853certza/vEh7XebPVvAUDLhUJFo2S/6eab6e5c397a4257b74444a562229455/support-associate-15.png",
      scale: 0.246896,
      top: 46.7084,
      left: 165,
      duration: 97.5601,
      delay: -45.5281,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[560px] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
      {/* Background support image */}
      <div className="absolute inset-0">
        <img
          src="https://images.ctfassets.net/23u853certza/7n9PMkDkDocpv1YfONDcsI/616a70ee6e8075816495c1eeb38b0922/support.png?w=960&q=90&fm=webp"
          alt="Support Background"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Animated floating team members */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F35939b3455354091a294334eb9ee6bd8)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {supportTeam.map((member, index) => (
          <div
            key={index}
            className="absolute animate-float-team"
            style={
              {
                left: `${member.left}%`,
                top: `${member.top}%`,
                transform: `scale(${member.scale})`,
                transformOrigin: "0px 0px",
                animationDuration: `${member.duration}s`,
                animationDelay: `${member.delay}s`,
                "--member-scale": member.scale.toString(),
              } as React.CSSProperties
            }
          >
            <img
              src={member.image}
              alt={`${member.name}, ${member.country}`}
              title={`${member.name}, ${member.country}`}
              className="inline-block w-auto h-auto"
              tabIndex={-1}
            />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-2 md:mb-3 text-white">
          Real support from real people
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
          Our world-class support team provides friendly assistance and fast
          response times.
        </p>
      </div>
    </div>
  );
}
