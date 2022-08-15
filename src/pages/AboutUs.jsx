function AboutUs() {

    //ref-id
    const sendEmail = () => {
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "kaulkikass@gmail.com",
            Password : "37D54613A0C9C8DE8708AC02619AF5806DA4",
            To : 'kaulkikass@gmail.com',
            From : "kaulkikass@gmail.com",
            Subject : "This is the subject",
            Body : "And this is the body",
            // Body : `Sulle saatis e-maili ${nameRef.current.value} 
      //   (email: ${emailRef.current.value}), tema sõnumi sisu:
      //   ${messageRef.current.value}`
        }).then(
          message => alert(message)
        );
    }
    return ( 
    <div>
        {/* label + inputid */}
        <button onClick={sendEmail}>Saada meile email</button>
    </div> 
    );
}

export default AboutUs;