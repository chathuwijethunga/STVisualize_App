import React, { useState } from 'react';
import './CancerCare.css';
import cancer_prevention from '../assets/cancer_prevention.jpg'

function CancerCare() {
  const [activeSection, setActiveSection] = useState('cancer-risk');
  const [openSections, setOpenSections] = useState([]);

  // Toggle visibility of sections
  const toggleSection = (section) => {
    setOpenSections((prev) => {
      if (prev.includes(section)) {
        return prev.filter((s) => s !== section);
      } else {
        return [...prev, section];
      }
    });
  };

  // Handle section removal (close)
  // const removeSection = (section) => {
  //   setOpenSections((prev) => prev.filter((s) => s !== section));
  // };

  return (
    <div className="cancer-care">
      {/* Introduction Section */}
      <section className="cancer-care-introduction">
        <div>
          <h2>Cancer Prevention</h2>
          <p>
            Effective actions by governments, organisations, and individuals to reduce the
            risk factors for cancer, such as the consumption of tobacco, alcohol, and unhealthy foods, 
            can help prevent over one-third of all cancers.
          </p>
        </div>
        <img src={cancer_prevention} alt="Cancer Prevention" className='cancer-care-introduction-img' />
      </section>


      {/* Sticky Navigation Header */}
      <header className="header">

        <ul>
          <li
            className={activeSection === 'cancer-risk' ? 'active' : ''}
            onClick={() => setActiveSection('cancer-risk')}
          >
            Cancer Risk Factors
          </li>
          {/* <li
            className={activeSection === 'social-media' ? 'active' : ''}
            onClick={() => setActiveSection('social-media')}
          >
            Social Media Toolkit
          </li>
          <li
            className={activeSection === 'uicc' ? 'active' : ''}
            onClick={() => setActiveSection('uicc')}
          >
            UICC's Work
          </li> */}
        </ul>
      </header>

      {/* Content */}
      <div className="content">
        {/* Cancer Risk Factors Section */}
        <section
          className={`section ${activeSection === 'cancer-risk' ? 'active' : ''}`}
        >
          <h3 className="odds-number-2">Cancer Risk Factors</h3>
          <p>
          With an estimated <span className="odds-number-can">19.3 million cases and nearly 10 million deaths in 2020</span>, cancer is now the second leading cause of death worldwide. 
          The global burden of cancer is projected to grow with incidence and mortality rates set to rise by 40% by 2040 [1].
          </p>
          <p>
          <span className="odds-number-can">Up to half of cancer cases are preventable</span>, making cancer prevention measures a cost-effective means to reduce cancer incidence and mortality.
          </p>
          {/* Subsections */}
          <div className="subsections">
            <section>
              {/* <h4 className="odds-number-2">Primary Cancer Prevention</h4> */}
              <div>
                <p>
                <span className="odds-number-2">Primary cancer prevention</span> measures include interventions that block the initiation of cancer by altering exposure to risk factors, such as tobacco smoke, alcohol, occupational carcinogens, radiation, overweight and obesity, and other factors that are modifiable by changes in behavior or policy.
                </p>
              </div>
            </section>

            <section>
              {/* <h4 className="odds-number">Secondary Cancer Prevention</h4> */}
              <div>
                <p>
                <span className="odds-number-2">Secondary cancer prevention</span> measures relate to detecting cancer early and stopping it from getting worse. It includes screening tests that can identify and treat cancer early in its development. While effective tests for population screening are in place for only a few cancers (breast, cervix, lung, and colorectal cancer), primary and secondary (early detection) strategies can reduce the cancer burden by one third to a half and are therefore cost-effective and core components of a national cancer control strategy.
                </p>
              </div>
            </section>
          </div>
          <h3 className="odds-number-2">Cancer risk factors and prevention</h3>

          <p>
          
          A cancer risk factor is anything that increases a person's likelihood of developing cancer. Risk factors can include lifestyle factors such as smoking, alcohol consumption and poor diet, as well as genetic and environmental factors. Identifying and addressing risk factors through policy and programmes and behaviour changes can reduce the risk of developing cancer.
          </p>
          <p>
          Addressing the risk factors for cancer offer a cost-effective and long-term strategy for cancer control. In recognition of this, WHO recommends that “national policies and programmes should be implemented to raise awareness, to reduce exposure to cancer risk factors and to ensure that people are provided with the information and support they need to adopt healthy lifestyles.” [2]
          </p>
          <p>
          There are different evidence-based prevention strategies and approaches that national, regional and city governments can take to reduce the cancer burden, a few of which are highlighted in the specific sections below on different cancer risk factors.
          </p>
          

          {/* Subsections */}
          <div className="subsections">
            <section>
              <h4 onClick={() => toggleSection('tobacco-control')}>
                Tobacco Control
              </h4>
              {openSections.includes('tobacco-control') && (
                <div>
                  <p>
                    Tobacco use kills eight million people per year. In total, there are about one billion smokers worldwide, 800 million of which are living in low- and middle-income countries, which tobacco companies target more actively.
                    <br />
                    The consumption of tobacco products can lead to the development of more than 12 types of cancer and accounts for 25% of all cancer deaths globally, making tobacco the single greatest avoidable cancer risk factor.
                  </p>
                  <p>
                    Governments should implement measures outlined in the Framework Convention on Tobacco Control (FCTC), such as increasing taxes, plain packaging, banning advertising and promotion, eliminating exposure to second-hand smoke, educating the public about tobacco harm, providing suitable cessation services, and taking action against illicit trade.
                  </p>
                </div>
              )}
            </section>

          <section>
            <h4 onClick={() => toggleSection('alcohol')}>
              Alcohol
            </h4>
            {openSections.includes('alcohol') && (
              <div>
                <p>
                  The number of cancer cases due to alcohol is estimated to be more than 740,000 per year. The risk of cancer increases with the amount of alcohol consumed by an individual. Alcohol consumption is a risk factor for multiple cancers including oral, pharynx, larynx, oesophagus, liver, pancreas, colorectal, and breast.
                  <br />
                  Proven effective measures include increasing excise tax, enforcing bans on alcohol advertising, enforcing drink-driving laws, limiting blood alcohol concentration, providing psychosocial support, enforcing minimum age for alcohol purchase, and restricting or banning promotions of alcoholic beverages to young people.
                </p>
              </div>
            )}
          </section>

          <section>
            <h4 onClick={() => toggleSection('obesity')}>
              Obesity
            </h4>
            {openSections.includes('obesity') && (
              <div>
                <p>
                  Overweight (body mass index or BMI above 25) and obesity (BMI above 30) are linked to several cancer types, including of the oesophagus, breast, endometrium, and colorectum. Improving dietary factors, such as the consumption of fruits and vegetables, and regular physical activity have also been shown to reduce cancer incidence and help lower the risk of other non-communicable diseases.
                  <br />
                  Governments can help reduce people's exposure to unhealthy foods by enacting policies that severely restrict the marketing and sales of products that contribute to high body mass index, such as ultra-processed foods and sugary beverages.
                </p>
              </div>
            )}
          </section>

          <section>
            <h4 onClick={() => toggleSection('physical-inactivity')}>
              Physical Inactivity
            </h4>
            {openSections.includes('physical-inactivity') && (
              <div>
                <p>
                  Regular physical activity helps reduce the risk of cancer by maintaining a healthy body weight, regulating hormone levels, and strengthening the immune system.
                  <br />
                  Governments should raise awareness about the importance of physical activity, provide safe access to public open spaces, and encourage the implementation of workplace physical activity programs.
                </p>
              </div>
            )}
          </section>

          <section>
            <h4 onClick={() => toggleSection('infections')}>
              Infections
            </h4>
            {openSections.includes('infections') && (
              <div>
                <p>
                  According to the World Health Organization (WHO), approximately 15% of all cancers worldwide are caused by infections. The most common infectious agents linked to cancer include viruses such as hepatitis B and C, human papillomavirus (HPV), and Epstein-Barr virus (EBV), as well as bacteria such as Helicobacter pylori.
                  <br />
                  Effective and safe vaccines are available for HBV, which can help prevent liver cancer, and HPV, which contributes to a majority of cervical as well as some throat cancers.
                </p>
              </div>
            )}
          </section>

          <section>
            <h4 onClick={() => toggleSection('radiation')}>
              Radiation, Environmental, and Occupational Carcinogens
            </h4>
            {openSections.includes('radiation') && (
              <div>
                <p>
                  Exposure to certain environmental and occupational carcinogens such as ionizing radiation (including UV light) and chemicals can lead to cancer. Some chemicals and environmental pollutants, like asbestos, have been linked to cancer.
                  <br />
                  Preventive measures include avoiding sun exposure, using sunscreen, and promoting health policies in the workplace. For air pollution, implementing stricter vehicle emission standards and adopting clean technologies to reduce industrial pollution is crucial.
                </p>
              </div>
            )}
            </section>
          </div>
        </section>

        {/* Social Media Toolkit Section */}
        <section
          className={`section ${activeSection === 'social-media' ? 'active' : ''}`}
        >
          <h3>Social Media Toolkit</h3>
          <p>
            The social media toolkit provides resources and content to raise awareness
            about cancer prevention and encourage community action.
          </p>
        </section>

        {/* UICC's Work Section */}
        <section className={`section ${activeSection === 'uicc' ? 'active' : ''}`}>
          <h3>UICC's Work</h3>
          <p>
            The UICC works globally to mobilize efforts for cancer prevention, treatment,
            and research to reduce the cancer burden worldwide.
          </p>
        </section>
      </div>
    </div>
  );
}

export default CancerCare;
