

function CartonBox({ code, visible }) {
 return (
<div className={`flex justify-center mb-6 transition-all duration-250 ${
  visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-90"
}`}>
  <svg width="260" height="200" viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">
    {/* box body */}
    <rect x="20" y="60" width="180" height="120" rx="4" fill="#EF9F27" stroke="#BA7517" strokeWidth="1"/>
    {/* top flaps */}
    <polygon points="20,60 110,60 110,20 20,40" fill="#FAC775" stroke="#BA7517" strokeWidth="1"/>
    <polygon points="110,60 200,60 200,40 110,20" fill="#EF9F27" stroke="#BA7517" strokeWidth="1"/>
    <line x1="110" y1="20" x2="110" y2="60" stroke="#BA7517" strokeWidth="1"/>
    {/* tape */}
    <rect x="90" y="20" width="40" height="40" fill="#FAC775" opacity="0.5"/>
    {/* front stripe */}
    <rect x="20" y="100" width="180" height="18" fill="#BA7517" opacity="0.18"/>
    {/* barcode */}
    <rect x="148" y="75" width="46" height="60" rx="2" fill="white" stroke="#BA7517" strokeWidth="0.5"/>
    <rect x="152" y="90" width="2" height="30" fill="#2C2C2A"/>
    <rect x="156" y="90" width="1" height="30" fill="#2C2C2A"/>
    <rect x="159" y="90" width="3" height="30" fill="#2C2C2A"/>
    <rect x="164" y="90" width="1" height="30" fill="#2C2C2A"/>
    <rect x="167" y="90" width="2" height="30" fill="#2C2C2A"/>
    <rect x="171" y="90" width="1" height="30" fill="#2C2C2A"/>
    <rect x="174" y="90" width="3" height="30" fill="#2C2C2A"/>
    <rect x="179" y="90" width="2" height="30" fill="#2C2C2A"/>
    <rect x="183" y="90" width="1" height="30" fill="#2C2C2A"/>
    <rect x="186" y="90" width="2" height="30" fill="#2C2C2A"/>
    <text x="171" y="133" textAnchor="middle" style={{fontFamily:"monospace", fontSize:"7px", fill:"#5F5E5A"}}>
      {String(code).padStart(4, "0")}
    </text>
    {/* code on front */}
    <text x="95" y="108" textAnchor="middle" style={{fontFamily:"monospace", fontSize:"11px", fill:"#5F5E5A", letterSpacing:"0.05em"}}>
      SORT CODE
    </text>
    <text x="95" y="148" textAnchor="middle" style={{fontFamily:"monospace", fontSize:"22px", fontWeight:"700", fill:"#2C2C2A", letterSpacing:"0.08em"}}>
      {String(code).padStart(4, "0")}
    </text>
  </svg>
</div>)
}

export default CartonBox;