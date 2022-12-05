import "./LogoAnim.css"

const LogoAnim = (props: { ver: number; label?: string; scale?: number; bgColor?: string; }) => {
  const size = props.scale;
  return (
    <div className="anim-ctn" style={props.scale ? { transform: `scale(${size})` } : {}}>
      <div className='anim-box'>
        <div className={props.ver == 3 ? 'anim-in3' : props.ver == 5 ? 'anim-in5' : 'anim-in'}></div>
      </div>
      <h1 className={props.ver == 1 ? 'anim-txt' : props.ver == 4 ? 'anim-txt4' : 'anim-txt2'}>
        {props.label ? props.label : 'SquareTwo'}
        {props.ver != 1 && props.ver != 4 && <div className={props.ver == 3 ? 'anim-cover2' : 'anim-cover'} style={props.bgColor ? { backgroundColor: props.bgColor } : {}}></div>}
      </h1>
    </div>
  )
}

export default LogoAnim;