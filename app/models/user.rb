class User < ActiveRecord::Base
  validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_many :links
  has_many :comments

  has_many :listings,
  primary_key: :id,
  foreign_key: :host_id,
  class_name: :Listing

  has_many :reservations,
  primary_key: :id,
  foreign_key: :host_id,
  class_name: :Booking

  has_many :trips,
  primary_key: :id,
  foreign_key: :guest_id,
  class_name: :Booking

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
