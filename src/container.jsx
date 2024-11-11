function Container({children,p}) {

    return (
      <div className={`container ${p}`}>
        {children}
      </div>
    )
  }
  
  export default Container