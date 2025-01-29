const Section = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <section className={`section ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  )
}

export default Section
