import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { IconName, ButtonAppearance, ButtonTypogr } from '@/kit';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import { useTranslation } from 'react-i18next';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import TitleContainer from '../TitleContainer/TitleContainer';
import RatingBox from '../RatingBox/RatingBox';

import {
  StyledOurCoachCard,
  OurCoachWrapper,
  OurCoachBox,
  PriceRatingBox,
  StyledButton,
  Avatar,
  Sport,
  SportEl,
} from './styles';

interface OurCoachCardProps {
  avatar?: string;
  firstName: string;
  lastName?: string;
  price: string[];
  // equipment: string[];
  sport?: string[];
  iconNames: IconName[];
  rating: number;
  counts: number[];
}

const OurCoachCard: React.FC<OurCoachCardProps> = ({
  avatar,
  firstName,
  lastName,
  // equipment,
  sport,
  price,
  rating,
  counts,
}) =>
  // const OurCoachCard: React.FC = ()
  {
    //   const navigate = useNavigate();

    // const handleMoreDetailsClick = () => {
    //   if (coachId) {
    //     navigate(`/club/${coachId}`);
    //   }
    // };

    const { t } = useTranslation();
    const theme = useTheme();

    return (
      <StyledOurCoachCard>
        <div style={{ width: '100%', marginBottom: `${theme.pxs.x8}px` }}>
          <TitleContainer titleKey="details_page.our_coach" />
          <OurCoachWrapper>
            <OurCoachBox>
              <Avatar src={avatar} alt={firstName} />
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: `${theme.pxs.x1}px`,
                    justifyContent: 'flex-start',
                    marginBottom: `${theme.pxs.x0_5}px`,
                  }}
                >
                  <h2 style={fonts.secondManrope}>{firstName}</h2>
                  <h2 style={fonts.secondManrope}>{lastName}</h2>
                </div>

                <PriceRatingBox>
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        ...fonts.mainManrope,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingBottom: `${theme.pxs.x0_5}px`,
                      }}
                    >
                      {' '}
                      {price}
                    </div>
                    <div
                      style={{
                        ...fonts.smallText,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      60-хв заняття
                    </div>
                  </div>
                  <RatingBox
                    iconNames={[IconName.STAR_DEFAULT]}
                    rating={rating}
                    counts={counts}
                    containerStyles={{
                      marginRight: `${theme.pxs.x7}px`,
                    }}
                    iconStyles={{
                      width: `${theme.pxs.x4_5}px`,
                      height: `${theme.pxs.x4_5}px`,
                    }}
                    spanStyles={fonts.mainManrope}
                  />
                </PriceRatingBox>
                <Sport style={fonts.popUp}>
                  {(sport || []).map((item, index) => (
                    <SportEl key={index}>{item}</SportEl>
                  ))}
                </Sport>
              </div>
            </OurCoachBox>
            <StyledButton
              testId="details_page.edit_button"
              title={t('details_page.more_details')}
              appearance={ButtonAppearance.PRIMARY}
              style={fonts.secondManrope}
            >
              <ButtonTypogr>{t('details_page.more_details')}</ButtonTypogr>
            </StyledButton>
          </OurCoachWrapper>
        </div>
        <StyledHr />
      </StyledOurCoachCard>
    );
  };

export default OurCoachCard;
