from .models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email'  ,'firstName','lastName', 'password')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email'  ,'last_name','first_name', 'password')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email','first_name','last_name', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['first_name']+' '+validated_data['last_name'],
            email=validated_data['email'],
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class CamanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Camany
        fields = ['id', 'name', 'place', 're_com']

class DatteSerializer(serializers.ModelSerializer):
    class Meta:
        model = datte
        fields = ['id', 'prix', 'time', 'client']

class VersSerializer(serializers.ModelSerializer):
    class Meta:
        model = vers
        fields = ['id', 'prix', 'time', 'client']

# class ClientSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Client
#         fields = ('id', 'name', 'prename', 'vers', 'datte', 'campany')

class ClientSerializer(serializers.ModelSerializer):
    # datte = DatteSerializer(many=True)
    # vers = VersSerializer(many=True)
    # campany = CamanySerializer()

    class Meta:
        model = Client
        fields = ('id', 'name', 'prename', 'vers', 'datte', 'campany')

class BuyingSerializer(serializers.ModelSerializer):
    balites = serializers.StringRelatedField(many=True)

    class Meta:
        model = Buying
        fields = ['id', 'client', 'balites', 'ptotal', 'time']

class BaliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = balite
        fields = ['id', 'name', 'color', 'prix', 'mitrage', 'prix_vendre', 'type', 'vent', 'client', 'campany']

