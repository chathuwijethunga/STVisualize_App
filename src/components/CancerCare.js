import React, { useState } from 'react';
import './CancerCare.css';
import cancer_prevention from '../assets/cancer_prevention.jpg';
import { AiOutlineMinus, AiOutlinePlus,} from 'react-icons/ai'; // Import the plus icon

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

  return (
    <div className="cancer-care">
      {/* Header Navigation */}
      <div className="header">
        <h2>Navigation</h2>
        <ul>
            <li><a href="/">Home</a></li>
        </ul>
      </div>
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
              <div>
                <p>
                  <span className="odds-number-2">Primary cancer prevention</span> measures include interventions that block the initiation of cancer by altering exposure to risk factors, such as tobacco smoke, alcohol, occupational carcinogens, radiation, overweight and obesity, and other factors that are modifiable by changes in behavior or policy.
                </p>
              </div>
            </section>

            <section>
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
            Addressing the risk factors for cancer offer a cost-effective and long-term strategy for cancer control. In recognition of this, WHO recommends that “national policies and programmes should be implemented to raise awareness, to reduce exposure to cancer risk factors and to ensure that people are provided with the information and support they need to adopt healthy lifestyles.”
          </p>
          <p>
            There are different evidence-based prevention strategies and approaches that national, regional and city governments can take to reduce the cancer burden, a few of which are highlighted in the specific sections below on different cancer risk factors.
          </p>


          {/* Subsections with Expand/Collapse and Plus Icon */}
          <div className="subsections">
            <section>
              <h4 onClick={() => toggleSection('tobacco-control')} className="collapsible-header">
                Tobacco Control
                {!openSections.includes('tobacco-control') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('tobacco-control') && <AiOutlineMinus className="minus- icon"/> &&
              (
                <div>
                  <p>
                    Tobacco use kills eight million people per year. In total, there are about one billion smokers worldwide, 800 million of which are living in low- and middle-income countries, which tobacco companies target more actively.<br />
                  </p>
                  <p>
                    The consumption of tobacco products can lead to the development of more than 12 types of cancer and It accounts for 25% of all cancer deaths globally, making tobacco the single greatest avoidable cancer risk factor. This includes people who smoke tobacco directly, those exposed to second-hand smoke and smokeless tobacco product consumption (such as chewing tobacco or snus).                  </p>
                  <p>
                    Smokers are up to 22 times more likely to develop lung cancer in their lifetime compared to non-smokers. However, people who do not use tobacco but who are exposed to second-hand smoke at home, work or in other public places also have an increased risk of developing lung diseases, including chronic respiratory diseases and lung cancer.                  
                  </p>
                  <h5>Prevention</h5>
                  <p>
                    Governments should implement measures outlined in the Framework Convention on Tobacco Control (FCTC), such as increasing taxes, plain packaging, banning advertising and promotion, eliminating exposure to second-hand smoke, educating the public about tobacco harm, providing suitable cessation services and taking action against illicit trade. 
                  </p>
                </div>
              )}
            </section>

            <section>
              <h4 onClick={() => toggleSection('alcohol')} className="collapsible-header">
                Alcohol
                {!openSections.includes('alcohol') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('alcohol') && (
                <div>
                  <p>
                  The number of cancer cases due to alcohol is estimated to be more than 740,000 per year. The risk of cancer increases with the amount of alcohol consumed by an individual. Alcohol consumption is a risk factor for multiple cancers including oral, pharynx, larynx, oesophagus, liver, pancreas, colorectal and breast. People who use both alcohol and tobacco have a 5-fold increased risk of developing cancers of the oral cavity, oropharynx, larynx and oesophagus compared to people who use either alcohol or tobacco alone. For heavy users, the risk is up to 30 times higher.
                  </p>
                  <h5>Prevention</h5>
                  <p>
                  The Global report on alcohol and SAFER offers guidelines to reducing the consumption of alcohol. Proven effective measures include increasing excise tax, enforcing bans on alcohol advertising, enforcing drink-driving laws and limiting blood alcohol concentration, providing psychosocial support, enforcing minimum age for alcohol purchase, and restricting or banning promotions of alcoholic beverages to young people. There is also a growing body of evidence supporting the effectiveness of warning labels on alcohol packaging.
                  </p>
                </div>
              )}
            </section>

            <section>
              <h4 onClick={() => toggleSection('obesity')} className="collapsible-header">
                Obesity
                {!openSections.includes('obesity') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('obesity') && (
                <div>
                  <p>
                  Overweight (body mass index or BMI above 25) and obesity (BMI above 30) are linked to several cancer types, including of the oesophagus, breast, endometrium and colorectum. Improving dietary factors, such as the consumption of fruits and vegetables, and regular physical activity have also been shown to reduce cancer incidence and help lower the risk of other non-communicable diseases.
                  </p>
                  <h5>Prevention</h5>
                  <p>
                  Governments can help reduce people's exposure to unhealthy foods by enacting policies that severely restrict the marketing and sales of products that contribute to high body mass index, such as ultra processed foods and sugary beverages. Measures include organising mass media campaigns to communicate on salt intake and healthy diet, reducing and replacing industrial trans-fat and saturated fats, reducing sugar and processed meat consumption, and promoting fruit and vegetable intake.
                  </p>
                  <p>
                  The International Collaboration on Nutrition in relation to Cancer (ICONIC) is a formal Taskforce of the International Union of Nutritional Sciences, gathering experts in the fields of nutrition and cancer from around the world. It focuses on advancing research in the area of nutrition and cancer, with the ultimate goal of preventing cancer through healthy diets and lifestyle choices. The organisation's website provides information on ongoing research projects, publications and events related to nutrition and cancer. The task force also offers resources and tools for healthcare professionals and the public to promote healthy eating habits and reduce the risk of cancer. 
                  </p>
                </div>
              )}
            </section>

            <section>
              <h4 onClick={() => toggleSection('physical-inactivity')} className="collapsible-header">
                Physical Inactivity
                {!openSections.includes('physical-inactivity') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('physical-inactivity') && (
                <div>
                  <p>
                    Regular physical activity helps reduce the risk of cancer by maintaining a healthy body weight, regulating hormone levels, and strengthening the immune system.
                  </p>
                  <h5>Prevention</h5>
                  <p>
                    Governments should raise awareness about the importance of physical activity, provide safe access to public open spaces, and encourage the implementation of workplace physical activity programs.
                  </p>
                </div>
              )}
            </section>

            <section>
              <h4 onClick={() => toggleSection('infections')} className="collapsible-header">
                Infections
                {!openSections.includes('infections') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('infections') && (
                <div>
                  <p>
                    According to the World Health Organization (WHO), approximately 15% of all cancers worldwide are caused by infections. The most common infectious agents linked to cancer include viruses such as hepatitis B and C, human papillomavirus (HPV), and Epstein-Barr virus (EBV), as well as bacteria such as Helicobacter pylori.
                    </p>
                    <h5>Prevention</h5>
                    <p>
                    Effective and safe vaccines are available for HBV, which can help prevent liver cancer, and HPV, which contributes to a majority of cervical as well as some throat cancers.
                  </p>
                </div>
              )}
            </section>

            <section>
              <h4 onClick={() => toggleSection('radiation')} className="collapsible-header">
                Radiation, Environmental, and Occupational Carcinogens
                {!openSections.includes('radiation') && <AiOutlinePlus className="plus-icon" />}
              </h4>
              {openSections.includes('radiation') && (
                <div>
                  <p>
                    Exposure to certain environmental and occupational carcinogens such as ionizing radiation (including UV light) and chemicals can lead to cancer. Some chemicals and environmental pollutants, like asbestos, have been linked to cancer.
                    </p>
                    <h5>Prevention</h5>
                    <p>
                    Preventive measures include avoiding sun exposure, using sunscreen, and promoting health policies in the workplace. For air pollution, implementing stricter vehicle emission standards and adopting clean technologies to reduce industrial pollution is crucial.
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>

      </div>
    </div>
  );
}

export default CancerCare;