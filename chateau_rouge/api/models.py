from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.utils.timezone import now



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Camany(models.Model):
    name = models.CharField(max_length=50)
    place = models.CharField(max_length=150)
    re_com =models.CharField(max_length=30)
    balites = models.ManyToManyField('Balite')

class Client(models.Model):
    name = models.CharField(max_length=30)
    prename = models.CharField(max_length=30)
    campany = models.ForeignKey(Camany, on_delete=models.CASCADE)
    # vers = models.ForeignKey('vers', on_delete=models.SET_NULL, null=True, blank=True, related_name='client_vers')
    # datte = models.ForeignKey('datte', on_delete=models.SET_NULL, null=True, blank=True, related_name='client_datte')
    vers_set = models.Manager()
    datte_set = models.Manager()
    objects = models.Manager()

class Buying(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    balites = models.ManyToManyField('Balite')
    ptotal = models.IntegerField(default=0)
    time = models.CharField(max_length=50)

    def __str__(self):
        return f"Buying for {self.client.name}"

    @property
    def prix_t(self):
        return sum(balite.prix_vendre for balite in self.balites.all())

    def save(self, *args, **kwargs):
        self.ptotal = self.prix_t
        self.time = now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        super().save(*args, **kwargs)
      
class balite(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=30)
    prix = models.IntegerField(default=0)
    mitrage = models.IntegerField(default=0)
    prix_vendre = models.IntegerField(default=0)
    type = models.CharField(max_length=50)
    vent = models.IntegerField(
        choices=[(0, 'acha'), (1, 'vent')]
    )
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    campany = models.ForeignKey(Camany, on_delete=models.CASCADE)

class datte(models.Model):
    prix = models.IntegerField(default=0)
    time = models.CharField(max_length=50)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='datte_set')

    def save(self, *args, **kwargs):
        self.time = now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        super().save(*args, **kwargs)
         
class vers(models.Model):
    prix = models.IntegerField(default=0)
    time = models.CharField(max_length=50)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='vers_set')

    def save(self, *args, **kwargs):
        self.time = now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        super().save(*args, **kwargs)