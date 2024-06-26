from django.shortcuts import render
from django.http import JsonResponse
from api.models import User
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

class UserListview(APIView):
    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UsersSerializer(user, many=True)
        return Response(serializer.data)
    
class CamanyView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            balites = Camany.objects.filter(name__icontains=query)
        else:
            balites = Camany.objects.all()
        serializer = CamanySerializer(balites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CamanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            balites = Client.objects.filter(name__icontains=query)
        else:
            balites = Client.objects.all()
        serializer = ClientSerializer(balites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClientSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BuyingView(APIView):
    def get(self, request):
        buyings = Buying.objects.all()
        serializer = BuyingSerializer(buyings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BuyingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BaliteView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            balites = balite.objects.filter(name__icontains=query)
        else:
            balites = balite.objects.all()
        serializer = BaliteSerializer(balites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BaliteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DatteView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            balites = datte.objects.filter(name__icontains=query)
        else:
            balites = datte.objects.all()
        serializer = DatteListeSerializer(balites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DatteSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VersView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            balites = vers.objects.filter(name__icontains=query)
        else:
            balites = vers.objects.all()
        serializer = VersListeSerializer(balites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VersSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def dellet(request):
    try:
        datte.objects.exclude(id=0).delete()
    except datte.DoesNotExist:
        pass
    Response(status=status.HTTP_201_CREATED)
# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/userList/',
        '/api/camanies/',
        '/api/clients/',
        '/api/buyings/',
        '/api/balites/',
        '/api/dattes/',
        '/api/vers/',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
