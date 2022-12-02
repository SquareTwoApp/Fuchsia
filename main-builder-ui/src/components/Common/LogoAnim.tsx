import "./LogoAnim.css"

const LogoAnim = (props: { ver: number; label?: string; }) => {
  return (
    <div className="anim-ctn">
      <div className='anim-box'>
        <div className={props.ver == 3 ? 'anim-in3' : 'anim-in'}></div>
      </div>
      <h1 className={props.ver == 1 ? 'anim-txt' : props.ver == 4 ? 'anim-txt4' : 'anim-txt2'}>
        {props.label ? props.label : 'SquareTwo'}
        {props.ver != 1 && props.ver != 4 && <div className={props.ver == 3 ? 'anim-cover2' : 'anim-cover'}></div>}
      </h1>
    </div>
  )
}

export default LogoAnim;