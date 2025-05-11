import { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import ReviewItem from '@/components/ReviewItem/ReviewItem';
import ReviewStats from '@/components/ReviewItem/ReviewStats';
import EditReviewPage from './EditReviewPage';
import ReviewActions from '@/components/ReviewItem/ReviewActions';
import ReviewTabsSwitcher from '@/components/ReviewItem/ReviewTabsSwitcher';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReviewCard, Loading, ErrorText } from '@/components/ReviewItem/styles';
import { Div, ButtonMore, ContainerButtonMore } from './styles';
import { fetchReviewsByOwner, deleteReview } from '@/redux/reviews/reviewsApi';
import { Roles } from '@/constants';

interface Review {
  id: string;
  userCommentId: string;
  name: string;
  surname: string;
  avatar: string;
  sport?: string[];
  comment: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  likes: number;
  dislikes: number;
  isFirstReview: boolean;
  userRole: 'customer' | 'coach' | 'adminClub';
  averageRating: number;
  totalReviews: number;
  ratings?: {
    clientService: number;
    serviceQuality: number;
    priceQuality: number;
    location: number;
    cleanliness: number;
  };
  targetId: string;
}

const ReviewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector(state => state.user);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [selectedTab, setSelectedTab] = useState<'coach' | 'adminClub'>(
    'adminClub',
  );
  const [showAll, setShowAll] = useState(false);
  const reviewsToShow = showAll ? reviews : reviews.slice(0, 2);

  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
  // const { theme } = useTheme();

  const handleReviewUpdate = (updatedReview: Review) => {
    setReviews(prev =>
      prev.map(r => (r.id === updatedReview.id ? updatedReview : r)),
    );
    fetchReviews();
    setIsEditing(false);
  };

  const fetchReviews = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const response = await fetchReviewsByOwner(user.userId);
      const reviewsData = response.data;
      console.log('reviewsData', reviewsData);
      setReviews(reviewsData);

      if (!Array.isArray(reviewsData)) {
        throw new Error('Некоректний формат даних від сервера');
      }

      const parsedReviews: Review[] = reviewsData
        .map((item): Review | null => {
          const userProfile = item.userProfile;
          if (!userProfile) return null;

          return {
            id: item._id,
            userCommentId: item.userCommentId,
            name: userProfile.firstName ?? '',
            surname: userProfile.lastName ?? '',
            avatar: userProfile.avatar ?? '',
            sport: userProfile.sport ?? '',
            comment: item.comment ?? '',
            createdAt: item.createdAt ?? '',
            updatedAt: item.updatedAt ?? '',
            rating: Math.round(item.average || 0),
            likes: 0,
            dislikes: 0,
            userRole: userProfile.role ?? 'customer',
            isFirstReview: item.isFirst ?? false,
            averageRating: item.average ?? 0,
            totalReviews: 1,
            targetId: item.targetId ?? '',
            //  ratings: item.ratings || null,
          };
        })
        .filter((review): review is Review => review !== null);

      const filteredByTab = parsedReviews.filter(
        review => review.userRole === selectedTab,
      );

      setReviews(filteredByTab);
    } catch (err) {
      // console.error('Помилка при отриманні відгуків:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?.userId, selectedTab]);
  // console.log(selectedTab);
  // console.log('user?.userId inside useEffect:', user?.userId);

  // Функція для видалення відгуку
  const handleDeleteReview = async (id: string) => {
    console.log('Йде видалення відгуку з id:', id);
    if (window.confirm('Ви дійсно хочете видалити цей відгук?')) {
      try {
        await deleteReview(id); // Викликаємо функцію для видалення
        setReviews(prev => prev.filter(review => review.id !== id));
      } catch (err) {
        // console.error('Помилка при видаленні:', err);
        setError('Failed to delete feedback');
      }
    }
  };

  const handleEdit = (review: Review) => {
    //  console.log('Редагуємо відгук з id:', review.id);
    setCurrentReview(review);
    setIsEditing(true);
  };

  const handleCreateReview = () => {
    setIsCreatingReview(true);
  };

  // if (loading) return <Loading>{translate('loading') }</Loading>;
  // if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Div>
      {isEditing ? (
        currentReview && (
          <Div>
            <EditReviewPage
              review={currentReview}
              onCancel={() => setIsEditing(false)}
              onSave={handleReviewUpdate}
            />
          </Div>
        )
      ) : (
        <>
          {!isCreatingReview && <ReviewHeader />}

          {user?.role !== Roles.COACH && user?.role !== Roles.ADMIN_CLUB && (
            <ReviewTabsSwitcher
              tabs={[translate('clubs'), translate('coachs')]}
              selectedTab={selectedTab}
              onSelectTab={tab => setSelectedTab(tab)}
            />
          )}
          {user?.role === Roles.COACH && <ReviewStats />}
          {loading ? (
            <Loading>{translate('loading')}</Loading>
          ) : error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            <>
              {reviewsToShow.map((review, index) => {
                const reviewDateToShow = review.updatedAt || review.createdAt;

                return (
                  <ReviewCard key={review.id} isEven={index % 2 === 0}>
                    <ReviewItem review={review} />

                    <ReviewActions
                      reviewId={review.id}
                      userCommentId={review.userCommentId}
                      onDelete={handleDeleteReview}
                      onEdit={() => handleEdit(review)}
                      userRole={review.userRole}
                      isFirstReview={review.isFirstReview}
                      createdAt={reviewDateToShow}
                      ownerId={review.targetId} // Якщо targetId є власником відгуку
                      currentUserId={id || ''}
                    />
                  </ReviewCard>
                );
              })}
              <ContainerButtonMore>
                {reviews.length > 2 && (
                  <ButtonMore onClick={() => setShowAll(prev => !prev)}>
                    {showAll ? translate('hide') : translate('show_more')}
                  </ButtonMore>
                )}
              </ContainerButtonMore>
            </>
          )}
        </>
      )}
    </Div>
  );
};

export default ReviewsPage;
